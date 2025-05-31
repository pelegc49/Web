import React, { useState, useEffect, useContext} from 'react'
import TextArea from './TextArea.jsx'
import { ReactFlow, Background, useEdgesState, useNodesState, MiniMap, Controls, Panel } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import { useLocation, useOutletContext } from 'react-router-dom';
import { objectify } from '../../services/Objectifier.jsx';
import { parse } from '../../services/Parser.jsx';
import { lexer } from '../../services/Tokenizer.jsx';
import { darkModeContext } from '../../App.jsx';
import LabelledEdge from './../diagramComponents/LabelledEdge.jsx';
import Toolbar from './Toolbar.jsx'
import domtoimage from 'dom-to-image';
import { signUpButton } from '../../assets/Style.jsx';

export default function Application() {
    const { user } = useOutletContext();
    const { darkMode } = useContext(darkModeContext);
    const [ project, setProject ] = useState({ loadEdges: [], loadNodes: [], loadKnownPositions: {}, loadText: "" })
    const location = useLocation();
    const [inputTime, setInputTime] = useState(null);
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const [knownPositions, setKnownPositions] = useState({});
    const [imageData, setImageData] = useState("");
    const edgeTypes = {
        labelled: LabelledEdge
    };

    useEffect(()=>{
        console.log("image data: ",imageData);
    },[imageData]);

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
    // useEffect(() => {
    //     if (projectText) {
    //         // Trigger the text processing immediately for the initial text
    //         const tokens = lexer(projectText);
    //         if (!tokens.status || tokens.status !== 'ERROR') {
    //             const parsed = parse(tokens.data);
    //             if (!parsed.status || parsed.status !== 'ERROR') {
    //                 const objectified = objectify(parsed.data);
    //                 if (!objectified.status || objectified.status !== 'ERROR') {
    //                     setNodes(objectified.nodes);
    //                     setEdges(objectified.edges);
    //                 }
    //             }
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [projectText]);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    function exportProject() {
        return {
            loadEdges:edges,
            loadNodes:nodes.map(e=>({
                id:e.id,
                data:e.data,
                position:e.position,
                measured:e.measured,
            })),
            loadKnownPositions:knownPositions,
            loadText:text,
        }
    }

    function getPhoto() {
        const Canvas = document.getElementById("reactFlowCanvas");
        // get rid of minimap, controls
        
        

        
        document.querySelectorAll('.react-flow__panel').forEach(e=>{
            console.log(e);
            e.style.display = 'none';
        })
        domtoimage.toPng(Canvas).then(data=>{
            setImageData(data);
            const a = document.createElement('a');
            a.download = 'my-image-name.png'
            a.href = data;
            a.click();
            return data;
        }).catch(error=>{
            setError("image generation failed");
            console.log(error);
        }).finally(()=>{
            document.querySelectorAll('.react-flow__panel').forEach(e=>{
              e.style.display = 'block';
           })
        })
        

        // return minimap, controls
    }
    
    
    useEffect(() => {
        if(location.state?.loadText)
            setText(location.state.loadText)
        if(location.state?.loadNodes)
            setNodes(location.state.loadNodes)
        if(location.state?.loadEdges)
            setEdges(location.state.loadEdges)
        if(location.state?.loadKnownPositions)
            setKnownPositions(location.state.loadKnownPositions)

        // if (location.state?.project) {
        //     // console.log("123:", ...location.state.project)
        //     setProject(e=>({loadText: location.state.project.loadText,
        //         loadNodes: location.state.project.loadNodes,
        //         loadEdges: location.state.project.loadEdges,
        //         loadKnownPositions: location.state.project.loadKnownPositions}));
        //     console.log("project:", project);
        //     setText(location.state.project.loadText)
        //     // setNodes(location.state.project.loadNodes)
        //     setEdges(location.state.project.loadEdges)
        //     setKnownPositions(location.state.project.loadKnownPositions)
        //     console.log({text,nodes,edges,knownPositions})
        // }
    }, [location.state])

    function handleNodeChange(change) {
        onNodesChange(change);
        // Only handle position changes
        change = change[0];
        if (change.type === "position") {
            console.log(JSON.stringify({ edges, nodes, knownPositions, text }))
            setKnownPositions(k => ({ ...k, [change.id]: change.position }));
        }
    }

    function handleChange(newContent) {
        setText(newContent)
    }
    return (
        <>
            <div className='w-full flex' hidden={!user}>
                <Toolbar/>
                <div className='w-1/3'>
                    <TextArea onContentChange={handleChange} initialValue={text}>
                        {error && (
                            <div className="absolute bottom-2 left-2 right-2 text-red-500 text-lg">
                                {error}
                            </div>
                        )}
                    </TextArea>

                </div>
                <div className='w-2/3'>
                    <ReactFlow
                        id='reactFlowCanvas'
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={handleNodeChange}
                        fitView
                        edgeTypes={edgeTypes}
                        colorMode={darkMode ? "dark" : "light"}>
                        <MiniMap className='toHide'/>
                        <Controls className='toHide'/>
                        <Background />
                        <Panel position='top-right' className='toHide'>
                            <button className={signUpButton} onClick={getPhoto}>download</button>
                        </Panel>
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


