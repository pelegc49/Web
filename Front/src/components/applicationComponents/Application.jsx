import React, { useState, useEffect, useContext } from 'react'
import TextArea from './TextArea.jsx'
import { ReactFlow, Background, useEdgesState, useNodesState, MiniMap, Controls } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import { useLocation, useOutletContext } from 'react-router-dom';
import { objectify } from '../../services/Objectifier.jsx';
import { parse } from '../../services/Parser.jsx';
import { lexer } from '../../services/Tokenizer.jsx';
import { darkModeContext } from '../../App.jsx';
import LabelledEdge from './../diagramComponents/LabelledEdge.jsx';
import Toolbar from './Toolbar.jsx'

export default function Application() {
    const { user } = useOutletContext();
    const { darkMode } = useContext(darkModeContext);
    const location = useLocation();
    const projectText = location.state?.projectText || '';

    const [inputTime, setInputTime] = useState(null);
    const [text, setText] = useState(projectText);
    const [error, setError] = useState(null);
    const [knownPositions, setKnownPositions] = useState({});

    const edgeTypes = {
        labelled: LabelledEdge
    };

    useEffect(() => {
        if (inputTime) {
            clearTimeout(inputTime);
        }
        const newTime = setTimeout(() => {
            if (text.trim() === '') {
                setNodes([]);
                setEdges([]);
                setError(null);
                return;
            };
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
                position: knownPositions[n.id] || n.position,

            })));
            setEdges(objectified.edges);
        }, 1000);
        setInputTime(newTime);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, knownPositions]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectText]);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);


    function handleNodeChange(change) {
        onNodesChange(change);
        // Only handle position changes
        change = change[0];
        if (change.type === "position") {
            setKnownPositions(k => ({ ...k, [change.id]: change.position }));
        }
    }

    function handleChange(newContent) {
        setText(newContent)
    }
    return (
        <>
        <div className='w-full flex' hidden={!user}>
        <Toolbar />
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
        <div hidden={user} className='w-full h-full flex items-center justify-center'>
            <div className='w-full h-full flex items-center justify-center'>
                Please log in to create a diagram.
            </div>
        </div>
        </>
    )
}


