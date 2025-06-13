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
    // Get user and modal handlers from the parent route (App) using Outlet context
    const { user, onLoginClick, onSignUpClick } = useOutletContext();
    // Get dark mode state from context
    const { darkMode } = useContext(darkModeContext);
    const location = useLocation();
    // State for input debounce timer
    const [inputTime, setInputTime] = useState(null);
    // State for the text input in the TextArea
    const [text, setText] = useState("");
    // State for error messages
    const [error, setError] = useState(null);
    // State for storing node positions
    const [knownPositions, setKnownPositions] = useState({});
    // State for storing the generated image data
    const [imageData, setImageData] = useState("");
    // State for displaying messages (success/error)
    const [message, setMessage] = useState(null);
    // State for showing/hiding the save modal
    const [showSaveModal, setShowSaveModal] = useState(false);
    // ReactFlow nodes and edges state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    // Define custom edge types for ReactFlow
    const edgeTypes = {
        labelled: LabelledEdge
    };

    // Debounced effect: Parse and process text input, update nodes/edges
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
            // Tokenize, parse, and objectify the input text
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
            // Set nodes and edges for ReactFlow
            setNodes(objectified.nodes.map((n) => ({
                ...n,
                position: knownPositions[n.id] || n.position,
            })));
            setEdges(objectified.edges);
        }, 1000);
        setInputTime(newTime);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, knownPositions]);

    // Close the save modal and clear messages
    function closeSaveWindow() {
        setShowSaveModal(false)
        setMessage(null)
    }

    // Export the current project (nodes, edges, positions, text)
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

    // Save the current project to the backend
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
        const img = await getPhoto(false);
        axios.post('/api/projects', {
            user,
            project: {
                image: img,
                name: projName,
                ...project
            }
        }).then(() => {
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

    // Generate a PNG image of the diagram using dom-to-image
    async function getPhoto(download) {
        let Canvas = document.querySelector(".react-flow__viewport");
        if (download) {
            Canvas = document.getElementById("reactFlowCanvas");
        }
        // Hide ReactFlow panels before taking screenshot
        document.querySelectorAll('.react-flow__panel').forEach(e => {
            e.style.display = 'none';
        })
        try {
            const data = await domtoimage.toPng(Canvas,{bgcolor:"#000000"});
            setImageData(e => data);
            if (download) {
                const a = document.createElement('a');
                a.download = 'my-image-name.png';
                a.href = data;
                a.click();
            }
            return data;
        } catch (error) {
            setError("image generation failed");
            console.log(error);
        } finally {
            // Restore ReactFlow panels
            document.querySelectorAll('.react-flow__panel').forEach(e => {
                e.style.display = 'block';
            });
        }
    }

    // Load project data from navigation state (when opening a saved project)
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

    // Handle node position changes in ReactFlow
    function handleNodeChange(change) {
        onNodesChange(change);
        // Only handle position changes
        change = change[0];
        if (change.type === "position") {
            setKnownPositions(k => ({ ...k, [change.id]: change.position }));
        }
    }

    // Handle text changes from the TextArea
    function handleChange(newContent) {
        setText(newContent)
    }

    return (
        <>
            {/* Main application UI, hidden if user is not logged in */}
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
                        {/* Save and Download buttons */}
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
                {/* Save project modal */}
                <SaveProject
                    open={showSaveModal}
                    onClose={closeSaveWindow}
                    onSave={saveProject}
                    msg={message}
                />
            </div>
            {/* Welcome screen for users who are not logged in */}
            <div hidden={user} className={styles.welcomeScreenContainer(darkMode)}>
                <div className={styles.welcomeScreenContent(darkMode)}>
                    <h1 className={styles.welcomeScreenTitle}>Welcome to Text to Class Diagram</h1>
                    <div className={styles.welcomeScreenDescription}>
                        <p className={styles.welcomeScreenParagraph}>
                            Transform your ideas into visual representations with our powerful UML diagramming tool.
                        </p>
                        <p className={styles.welcomeScreenSecondaryText}>
                            Join us and bring your design concepts to life.
                        </p>
                    </div>
                    
                    <div className={styles.welcomeScreenButtonContainer}>
                        <button 
                            onClick={onLoginClick}
                            className={styles.welcomeScreenSignInButton}
                        >
                            Sign In to Get Started
                        </button>
                        <p className={styles.welcomeScreenSignUpText(darkMode)}>
                            New user? <button onClick={onSignUpClick} className={styles.welcomeScreenSignUpLink}>Create an account</button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


