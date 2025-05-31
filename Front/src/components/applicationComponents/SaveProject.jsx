import React, { useContext } from 'react';
import { darkModeContext } from "../../App.jsx";
import * as styles from '../../assets/Style.jsx';

export default function SaveProject({ open, onClose }) {
    const { darkMode } = useContext(darkModeContext);
    
    if (!open) return null;

    const handleSave = () => {
        // Just logging for now as requested
        console.log("Text");
        onClose();
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
            </div>
        </div>
    );
}