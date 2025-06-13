// SaveProject.jsx provides a modal dialog for saving UML projects
// This component handles project name input and saving functionality
// It supports dark mode theming and displays success/error messages

import React, { useContext, useState } from 'react';
import { darkModeContext } from "../../App.jsx";
import * as styles from '../../assets/Style.jsx';

// SaveProject component displays a modal dialog for saving projects
// Props:
// - open: boolean to control modal visibility
// - onClose: function to handle modal closing
// - onSave: function to handle saving the project
// - msg: object containing message text and color for feedback
export default function SaveProject({ open, onClose, onSave, msg}) {
    // Get dark mode state from context for theming
    const { darkMode } = useContext(darkModeContext);
    // State to store the project name input
    const [text,setText] = useState("");

    // Don't render if modal is not open
    if (!open) return null;

    // Handle save button click by calling the onSave callback with project name
    const handleSave = () => {
        // Just logging for now as requested
        onSave && onSave(text)
    };


    // Render the modal with input field and action buttons
    return (
        <div className={styles.saveProjectModal}>
            <div className={styles.saveProjectContent(darkMode)}>
                <h2 className={styles.saveProjectTitle}>Save Project</h2>
                <div className={styles.saveProjectInputGroup}>
                    <label className={styles.saveProjectLabel}>Project Name</label>
                    <input 
                        type="text" 
                        className={styles.saveProjectInput(darkMode)}
                        placeholder="Enter project name"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className={styles.saveProjectButtonGroup}>
                    <button
                        onClick={onClose}
                        className={styles.saveProjectCancelButton(darkMode)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className={styles.saveProjectSaveButton}
                    >
                        Save
                    </button>
                </div>
                {msg &&
                    <span className={`text-xl font-bold text-${msg.color}`}>{msg.text}</span>
                }
            </div>
        </div>
    );
}