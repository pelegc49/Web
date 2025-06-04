import React, { useState, useEffect, useContext } from 'react'
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
import SaveProject from './SaveProject.jsx'
import { save, download } from '../../assets/svgs.jsx'
import * as styles from '../../assets/Style.jsx'
import axios from 'axios';

export default function Application() {
    const { user } = useOutletContext();
    const { darkMode } = useContext(darkModeContext);
    const location = useLocation();
    const [inputTime, setInputTime] = useState(null);
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const [knownPositions, setKnownPositions] = useState({});
    const [imageData, setImageData] = useState("");
    const [message, setMessage] = useState(null);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

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

    function closeSaveWindow() {
        setShowSaveModal(false)
        setMessage(null)
    }

    function exportProject() {
        nodes.map(e => {
            delete e.data.label;
        })
        return {
            loadEdges: edges,
            loadNodes: nodes,
            loadKnownPositions: knownPositions,
            loadText: text,
        }
    }
    async function saveProject(projName) {
        if (!projName.trim()) {
            setMessage({
                color: "red-500",
                text: "Please enter a valid project name"
            })
            return;
        }
        if (!text.trim()) {
            setMessage({
                color: "red-500",
                text: "Your project is blank"
            })
            return;
        }
        const project = exportProject();
        console.log(1);

        const img = await getPhoto(false);
        console.log(img);

        axios.post('/api/projects', {
            user,
            project: {
                image: img,
                name: projName,
                ...project
            }
        }).then(() => {
            console.log(6);
            setMessage({
                color: "green-400",
                text: "Successfuly saved"
            })
            setTimeout(closeSaveWindow, 1000)
        }).catch((e) => {
            setMessage({
                color: "red-500",
                text: e
            })
        })
    }

    async function getPhoto(download) {
        let Canvas = document.querySelector(".react-flow__viewport");
        if (download) {
            Canvas = document.getElementById("reactFlowCanvas");
        }
        document.querySelectorAll('.react-flow__panel').forEach(e => {
            e.style.display = 'none';
        })
        try {
            console.log(2);
            const data = await domtoimage.toPng(Canvas);
            console.log(3);
            setImageData(e => data);
            if (download) {
                const a = document.createElement('a');
                a.download = 'my-image-name.png';
                a.href = data;
                a.click();
            }
            console.log(4);

            return data;
        } catch (error) {
            setError("image generation failed");
            console.log(error);
        } finally {
            document.querySelectorAll('.react-flow__panel').forEach(e => {
                e.style.display = 'block';
            });
        }

    }


    useEffect(() => {
        if (location.state?.loadText)
            setText(location.state.loadText)
        if (location.state?.loadNodes)
            setNodes(location.state.loadNodes)
        if (location.state?.loadEdges)
            setEdges(location.state.loadEdges)
        if (location.state?.loadKnownPositions)
            setKnownPositions(location.state.loadKnownPositions)
    }, [location.state])

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
            <div className={styles.applicationContainer(darkMode)} hidden={!user}>
                <Toolbar />
                <div className={styles.textAreaSection}>
                    <div className={styles.textAreaWrapper}>
                        <TextArea onContentChange={handleChange} initialValue={text}>
                            {error && (
                                <div className={styles.errorMessage}>
                                    {error}
                                </div>
                            )}
                        </TextArea>
                        <div className={styles.saveButtonWrapper}>
                            <div className={styles.tooltipContainer()}>
                                <button
                                    onClick={() => setShowSaveModal(true)}
                                    className={styles.saveButton(darkMode)}
                                >
                                    <img src={save} alt="Save" className={styles.saveButtonIcon} />
                                </button>
                                <div className={styles.saveButtonTooltip(darkMode)}>
                                    Save project
                                </div>
                            </div>
                        </div>
                        <div className={styles.downloadButtonWrapper}>
                            <div className={styles.tooltipContainer()}>
                                <button
                                    onClick={_=>getPhoto(true)}
                                    className={styles.saveButton(darkMode)}
                                >
                                    <img src={download} alt="download" className={styles.saveButtonIcon} />
                                </button>
                                <div className={styles.saveButtonTooltip(darkMode)}>
                                    Download project
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.diagramSection}>
                    <ReactFlow
                        id='reactFlowCanvas'
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={handleNodeChange}
                        fitView
                        edgeTypes={edgeTypes}
                        colorMode={darkMode ? "dark" : "light"}>
                        <MiniMap className='toHide' />
                        <Controls className='toHide' />
                        <Background />
                    </ReactFlow>
                </div>
                <SaveProject
                    open={showSaveModal}
                    onClose={closeSaveWindow}
                    onSave={saveProject}
                    msg={message}
                />
            </div>
            <div hidden={user} className={styles.loginMessage}>
                <div className={styles.loginMessage}>
                    Please log in to create a diagram.
                </div>
            </div>
        </>
    )
}


