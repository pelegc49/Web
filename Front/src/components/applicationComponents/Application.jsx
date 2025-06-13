import React, { useState } from 'react'
import TextArea from './TextArea.jsx'
import { ReactFlow, Background, useEdgesState, useNodesState, MiniMap, Controls } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { objectify } from '../services/Objectifier.jsx';
import { parse } from '.../services/Parser.jsx';
import { lexer } from '.../services/Tokenizer.jsx';
import { darkModeContext } from '../App.jsx';
import LabelledEdge from '../diagramComponents/LabelledEdge.jsx';

// Main Application component for class diagram editor
export default function Application() {
    // Get dark mode state and toggle function from context
    const { darkMode, toggleDarkMode } = useContext(darkModeContext);
    // Get navigation state (for loading project text)
    const location = useLocation();
    // Load initial project text from navigation state if present
    const projectText = location.state?.projectText || '';

    // State for debouncing input
    const [inputTime, setInputTime] = useState(null);
    // State for event timing (not used in this snippet)
    const [eventTime, setEventTime] = useState(null);
    // State for the text in the TextArea
    const [text, setText] = useState(projectText);
    // State for error messages
    const [error, setError] = useState(null);
    // State for storing node positions
    const [knownPositions, setKnownPositions] = useState({});

    // Define custom edge types for ReactFlow
    const edgeTypes = {
        labelled: LabelledEdge
    };

    // Effect: Parse and process text input, update nodes/edges with debounce
    useEffect(() => {
        if (inputTime) {
            clearTimeout(inputTime);
        }
        const newTime = setTimeout(() => {
            // setNodes([]);
            // setEdges([]);
            if (text.trim() === '') return;
            const tokens = lexer(text);
            if (tokens.status === 'ERROR') {
                setError(tokens.message);
                return;
            }
            else {
                setError(null);
            }
            const parsed = parse(tokens.data);
            if (parsed.status === 'ERROR') {
                setError(parsed.message);
                return;
            }
            else {
                setError(null);
            }
            const objectified = objectify(parsed.data);
            if (objectified.status === 'ERROR') {
                setError(objectified.message);
                return;
            }
            else {
                setError(null);
            }
            setNodes(objectified.nodes.map((n) => ({
                ...n,
                position: knownPositions[n.id] || n.position
            })));
            // setNodes(objectified.nodes.map((n)=>{
            //     if (knownPositions[n.id]){
            //         n.position = knownPositions[n.id];
            //     } 
            //     return n;
            // }));
            setEdges(objectified.edges);
        }, 1000);
        setInputTime(newTime);
    }, [text]);

    // Effect: Process initial project text when component loads
    useEffect(() => {
        if (projectText) {
            // Trigger the text processing immediately for the initial text
            const tokens = lexer(projectText);
            if (!tokens.status || tokens.status !== 'ERROR') {
                const parsed = parse(tokens.data);
                if (!parsed.status || parsed.status !== 'ERROR') {
                    const objectified = objectify(parsed.data);
                    if (!objectified.status || objectified.status !== 'ERROR') {
                        setNodes(objectified.nodes);
                        setEdges(objectified.edges);
                    }
                }
            }
        }
    }, [projectText]);

    // ReactFlow state hooks for nodes and edges
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    // Handle node position changes in ReactFlow
    function handleNodeChange(change) {
        onNodesChange(change);
        change = change[0];
        if (change.type === "position") {
            setKnownPositions(k => ({ ...k, [change.id]: change.position }));
        }
    }

    // Handle text changes from the TextArea
    function handleChange(newContent) {
        setText(newContent)
    }
    // Render the main layout: TextArea on left, ReactFlow diagram on right
    return (
        <div className='w-full flex'>
            <div className='w-1/3'>
                <TextArea onContentChange={handleChange} initialValue={projectText}>
                    {error && (
                        <div className="absolute bottom-2 left-2 right-2 text-red-500 text-lg">
                            {error}
                        </div>
                    )}
                </TextArea>

            </div>
            <div className='w-2/3'>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={handleNodeChange}
                    fitView
                    edgeTypes={edgeTypes}
                    colorMode={darkMode ? "dark" : "light"}>
                    <MiniMap />
                    <Controls />
                    <Background />

                </ReactFlow>
            </div>
        </div>
    )
}


