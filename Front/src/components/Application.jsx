import React, { useState } from 'react'
import TextArea from './TextArea.jsx'
import {ReactFlow, Background, useEdgesState, useNodesState, MiniMap, Controls} from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import { useEffect, useContext } from 'react';
import { objectify } from '../services/Objectifier.jsx';
import { parse } from '../services/Parser.jsx';
import { lexer } from '../services/Tokenizer.jsx';
import { darkModeContext } from '../App.jsx';
import LabelledEdge from './LabelledEdge.jsx';
export default function Application() {
    const {darkMode,toggleDarkMode} = useContext(darkModeContext);
    const [time, setTime] = useState(null);
    const [text, setText] = useState('');
    const [error, setError] = useState(null);

    const edgeTypes = {
        labelled: LabelledEdge
    };
    
    useEffect(() => {
        if (time) {
            clearTimeout(time);
        }
        const newTime = setTimeout(() => {
            if (text.trim() === '') return;
            const tokens = lexer(text);
            if (tokens.status === 'ERROR') {
                setError(tokens.message);
                return;
            }
            else{
                setError(null);
            }
            const parsed = parse(tokens.data);
            if (parsed.status === 'ERROR') {
                setError(parsed.message);
                return;
            }
            else{
                setError(null);
            }
            const objectified = objectify(parsed.data);
            if (objectified.status === 'ERROR') {
                setError(objectified.message);
                return;
            }
            else{
                setError(null);
            }
            setNodes(objectified.nodes);
            setEdges(objectified.edges);
            
        }, 1000);
        setTime(newTime);
    }, [text]);
    
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    
    useEffect(() => {console.log(nodes)}, [nodes]);
    
    function handleChange(newContent){
        setText(newContent)
    }

  return (
    <div className='w-full flex'>
        <div className='w-1/3'>
            <TextArea onContentChange={handleChange}/>
            {error && <div className='text-red-500'>{error}</div>}
        </div>
        <div className='w-2/3'>
            <ReactFlow 
                nodes={nodes}
                edges={edges} 
                onNodesChange={onNodesChange} 
                fitView 
                edgeTypes={edgeTypes}
                colorMode={darkMode?"dark":"light"}>
                <MiniMap />
                <Controls />
                <Background  />
                
            </ReactFlow>
        </div>
    </div>
  )
}


