import React, { useContext, useState } from 'react';
import { darkModeContext } from "../../App.jsx";
import * as styles from '../../assets/Style.jsx';

export default function SaveProject({ open, onClose, onSave, msg}) {
    const { darkMode } = useContext(darkModeContext);
    const [text,setText] = useState("");
    if (!open) return null;
    const handleSave = () => {
        // Just logging for now as requested
        onSave && onSave(text)
    };


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