import React from "react";
import * as styles from "./Style";
import {darkModeContext} from "../App.jsx"
export default function SyntaxHelp() {
    const {darkMode} = React.useContext(darkModeContext);
    return (
        <div className={styles.helpTextContainer}>
            <h2 className={styles.helpTextTitle}>Syntax Guide</h2>
            
            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle}>Defining Classes</h3>
                <p className={styles.helpTextContent}>
                    To define a class, use the following syntax:  
                </p>
                <pre className={styles.codeBlock}>
                    a &lt;className&gt; is a class.<br/>
                    <span className={styles.example}>Example: a Person is a class.</span><br/>
                    <span className={styles.example}>Example: a Car is a class.</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle}>Adding Attributes</h3>
                <p className={styles.helpTextContent}>
                    To define attributes for a class:
                </p>
                <pre className={styles.codeBlock}>
                    &lt;className&gt; has &lt;atr&gt;.<br/>
                    &lt;className&gt; has &lt;atr1&gt;, &lt;atr2&gt;.<br/>
                    <span className={styles.example}>Example: Person has name.</span><br/>
                    <span className={styles.example}>Example: Person has name, age.</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle}>Adding Methods</h3>
                <p className={styles.helpTextContent}>
                    To define methods (behaviors) for a class:
                </p>
                <pre className={styles.codeBlock}>
                    &lt;className&gt; can &lt;met1&gt;.<br/>
                    &lt;className&gt; can &lt;met2&gt; with &lt;atr1&gt;.<br/>
                    &lt;className&gt; can &lt;met3&gt; with &lt;atr1&gt;, &lt;atr2&gt;.<br/>
                    <span className={styles.example}>Example: Person can walk.</span><br/>
                    <span className={styles.example}>Example: Person can drive with license.</span><br/>
                    <span className={styles.example}>Example: Person can purchase with money, itemId.</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle}>Defining Relationships</h3>
                <p className={styles.helpTextContent}>
                    To establish relationships between classes:
                </p>
                <pre className={styles.codeBlock}>
                    many &lt;className&gt; is related to many &lt;className&gt;.<br/>
                    one &lt;className&gt; is related to many &lt;className&gt;.<br/>
                    many &lt;className&gt; is related to one &lt;className&gt;.<br/>
                    one &lt;className&gt; is related to one &lt;className&gt;.<br/>
                    <span className={styles.example}>Example: many Person is related to many Car. (many-to-many)</span><br/>
                    <span className={styles.example}>Example: one Person is related to many Car. (one-to-many)</span><br/>
                    <span className={styles.example}>Example: many Person is related to one Car. (many-to-one)</span><br/>
                    <span className={styles.example}>Example: one Person is related to one Car. (one-to-one)</span>
                </pre>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle}>Inheritance</h3>
                <p className={styles.helpTextContent}>
                    To define inheritance between classes:
                </p>
                <pre className={styles.codeBlock}>
                    a &lt;className&gt; is a &lt;className&gt;.<br/>
                    <span className={styles.example}>Example: a Student is a Person.</span>
                </pre>
                <p className={styles.helpTextContent}>
                    This means Student inherits all attributes and methods from Person.
                </p>
            </div>

            <div className={styles.helpTextSection}>
                <h3 className={styles.helpTextSubtitle}>Comments</h3>
                <p className={styles.helpTextContent}>
                    To add comments to your code:
                </p>
                <pre className={styles.codeBlock}>
                    # This is a comment
                </pre>
                <p className={styles.helpTextContent}>
                    Comments are ignored when processing your code and are used for documentation.
                </p>
            </div>
        </div>
    );

}