// SyntaxHelp.jsx provides comprehensive documentation for the UML diagram syntax
// This component explains all available commands and syntax for creating class diagrams
// It includes examples and detailed explanations for each diagram element type

import React, { useContext } from "react";
import * as styles from "../../assets/Style.jsx";
import { darkModeContext } from "../../App.jsx";

// SyntaxHelp component displays detailed syntax guide with examples
// It covers class definitions, attributes, methods, relationships, and inheritance
export default function SyntaxHelp() {
    // Get dark mode context for theming
    const { darkMode } = useContext(darkModeContext);
    
    return (
        <div className={styles.helpTextContainer(darkMode)}>
            <h2 className={styles.helpTextTitle(darkMode)}>Syntax Guide</h2>
            
            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle(darkMode)}>Defining Classes</h3>
                <p className={styles.helpTextContent(darkMode)}>
                    To define a class, use the following syntax:  
                </p>
                <pre className={styles.codeBlock(darkMode)}>
                    a &lt;className&gt; is a class.<br/>
                    <span className={styles.example(darkMode)}>Example: a Person is a class.</span><br/>
                    <span className={styles.example(darkMode)}>Example: a Car is a class.</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle(darkMode)}>Adding Attributes</h3>
                <p className={styles.helpTextContent(darkMode)}>
                    To define attributes for a class:
                </p>
                <pre className={styles.codeBlock(darkMode)}>
                    &lt;className&gt; has &lt;atr&gt;.<br/>
                    &lt;className&gt; has &lt;atr1&gt;, &lt;atr2&gt;.<br/>
                    <span className={styles.example(darkMode)}>Example: Person has name.</span><br/>
                    <span className={styles.example(darkMode)}>Example: Person has name, age.</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle(darkMode)}>Adding Methods</h3>
                <p className={styles.helpTextContent(darkMode)}>
                    To define methods (behaviors) for a class:
                </p>
                <pre className={styles.codeBlock(darkMode)}>
                    &lt;className&gt; can &lt;met1&gt;.<br/>
                    &lt;className&gt; can &lt;met2&gt; with &lt;atr1&gt;.<br/>
                    &lt;className&gt; can &lt;met3&gt; with &lt;atr1&gt;, &lt;atr2&gt;.<br/>
                    <span className={styles.example(darkMode)}>Example: Person can walk.</span><br/>
                    <span className={styles.example(darkMode)}>Example: Person can drive with license.</span><br/>
                    <span className={styles.example(darkMode)}>Example: Person can purchase with money, itemId.</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle(darkMode)}>Defining Relationships</h3>
                <p className={styles.helpTextContent(darkMode)}>
                    To establish relationships between classes:
                </p>
                <pre className={styles.codeBlock(darkMode)}>
                    many &lt;className&gt; is related to many &lt;className&gt;.<br/>
                    one &lt;className&gt; is related to many &lt;className&gt;.<br/>
                    many &lt;className&gt; is related to one &lt;className&gt;.<br/>
                    one &lt;className&gt; is related to one &lt;className&gt;.<br/>
                    <span className={styles.example(darkMode)}>Example: many Person is related to many Car. (many-to-many)</span><br/>
                    <span className={styles.example(darkMode)}>Example: one Person is related to many Car. (one-to-many)</span><br/>
                    <span className={styles.example(darkMode)}>Example: many Person is related to one Car. (many-to-one)</span><br/>
                    <span className={styles.example(darkMode)}>Example: one Person is related to one Car. (one-to-one)</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle(darkMode)}>Inheritance</h3>
                <p className={styles.helpTextContent(darkMode)}>
                    To define inheritance between classes:
                </p>
                <pre className={styles.codeBlock(darkMode)}>
                    a &lt;className&gt; is a &lt;className&gt;.<br/>
                    <span className={styles.example(darkMode)}>Example: a Student is a Person.</span>
                </pre>
                <p className={styles.helpTextContent(darkMode)}>
                    This means Student inherits all attributes and methods from Person.
                </p>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle(darkMode)}>Comments</h3>
                <p className={styles.helpTextContent(darkMode)}>
                    To add comments to your code:
                </p>
                <pre className={styles.codeBlock(darkMode)}>
                    # This is a comment
                </pre>
                <p className={styles.helpTextContent(darkMode)}>
                    Comments are ignored when processing your code and are used for documentation.
                </p>
            </div>
        </div>
    );
}