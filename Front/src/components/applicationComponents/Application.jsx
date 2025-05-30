import React, { useState } from 'react'
import TextArea from './TextArea.jsx'
import { ReactFlow, Background, useEdgesState, useNodesState, MiniMap, Controls } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { objectify } from '../../services/Objectifier.jsx';
import { parse } from '../../services/Parser.jsx';
import { lexer } from '../../services/Tokenizer.jsx';
import { darkModeContext } from '../../App.jsx';
import LabelledEdge from './../diagramComponents/LabelledEdge.jsx';
export default function Application() {
    const { darkMode, toggleDarkMode } = useContext(darkModeContext);
    const location = useLocation();
    const projectText = location.state?.projectText || '';

    const [inputTime, setInputTime] = useState(null);
    const [eventTime, setEventTime] = useState(null);
    const [text, setText] = useState(projectText);
    const [error, setError] = useState(null);
    const [knownPositions, setKnownPositions] = useState({});
    const [toolbarOpen, setToolbarOpen] = useState(false);

    const edgeTypes = {
        labelled: LabelledEdge
    };

    const syntaxExamples = [
        {
            title: 'Simple Class',
            code: 'class Person {\n  name: String\n  age: Int\n}'
        },
        {
            title: 'Class with Relationship',
            code: 'class Car {\n  model: String\n  owner: Person\n}\nclass Person {\n  name: String\n}'
        },
        {
            title: 'Inheritance',
            code: 'class Animal {\n  species: String\n}\nclass Dog extends Animal {\n  breed: String\n}'
        }
    ];

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

    // Process initial project text when component loads
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

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    function handleNodeChange(change) {
        onNodesChange(change);
        change = change[0];
        if (change.type === "position") {
            setKnownPositions(k => ({ ...k, [change.id]: change.position }));
        }
    }

    function handleChange(newContent) {
        setText(newContent)
    }
    return (
        <div className="w-full h-screen flex flex-col-reverse md:flex-row">
            {/* Collapsible Toolbar */}
            <div
                style={{
                    position: 'relative',
                    width: toolbarOpen ? 260 : 32,
                    transition: 'width 0.3s',
                    background: '#f4f6fa',
                    borderRight: '1px solid #e0e0e0',
                    overflow: 'hidden',
                    zIndex: 10,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onMouseEnter={() => setToolbarOpen(true)}
                onMouseLeave={() => setToolbarOpen(false)}
            >
                <div style={{
                    width: 32,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: '#e9ecef',
                    borderBottomRightRadius: 8,
                    borderTopRightRadius: 8,
                }}>
                    <span style={{
                        display: 'inline-block',
                        transform: toolbarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                        fontSize: 20,
                        color: '#888',
                    }}>&#x25B6;</span>
                </div>
                {toolbarOpen && (
                    <div style={{ padding: '16px 12px', width: 228 }}>
                        <h3 style={{ fontSize: 16, marginBottom: 12, color: '#333' }}>Syntax Examples</h3>
                        {syntaxExamples.map((ex, idx) => (
                            <div key={idx} style={{ marginBottom: 16 }}>
                                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{ex.title}</div>
                                <pre style={{
                                    background: '#222',
                                    color: '#fff',
                                    borderRadius: 6,
                                    padding: '8px 10px',
                                    fontSize: 13,
                                    overflowX: 'auto',
                                }}>{ex.code}</pre>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row w-full h-full min-h-0">
                <div className="md:w-1/3 w-full order-2 md:order-1 min-h-[200px]">
                    <TextArea onContentChange={handleChange} initialValue={projectText}>
                        {error && (
                            <div className="absolute bottom-2 left-2 right-2 text-red-500 text-lg">
                                {error}
                            </div>
                        )}
                    </TextArea>
                </div>
                <div className="md:w-2/3 w-full order-1 md:order-2 flex-1 min-h-[200px] min-w-0">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={handleNodeChange}
                        fitView
                        edgeTypes={edgeTypes}
                        colorMode={darkMode ? "dark" : "light"}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <MiniMap />
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>
            </div>
        </div>
    )
}


