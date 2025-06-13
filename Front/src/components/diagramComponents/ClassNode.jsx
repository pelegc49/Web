// ClassNode.jsx represents a UML class diagram node
// This component visualizes a class with its name, attributes, and methods
// It supports dark mode theming and handles conditional rendering of class members

import React, { useContext } from "react";
import * as styles from "../../assets/Style.jsx";
import { darkModeContext } from "../../App.jsx";

// ClassNode component displays a single class node in the UML diagram
// Props:
// - className: string representing the name of the class
// - attributes: array of class attributes (properties)
// - methods: array of class methods, each containing method name and parameters
export default function ClassNode({ className, attributes, methods }) {
  // Get dark mode state from context for theming
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  
  // Check if the class has attributes or methods to render
  const hasAttributes = attributes && attributes.length > 0;
  const hasMethods = methods && methods.length > 0;
  const hasContent = hasAttributes || hasMethods;
  
  // Render the class node with its contents
  return (
    <div className={styles.classNodeContainer(darkMode)}>
      <h2 className={`${styles.classNodeTitle(darkMode)} ${hasContent ? `border-b ${darkMode ? "border-gray-600" : "border-gray-200"}` : ""}`}>
        {className}
      </h2>
      {hasAttributes && (
        <div className={`${hasMethods ? "mb-2" : ""}`}>
          {attributes.map((attr, index) => (
            <div key={index} className={styles.attributeItem(darkMode)}>
              <p className={styles.attributeText(darkMode)}>- {attr}</p>
            </div>
          ))}
        </div>
      )}
      {hasMethods && (
        <div className={hasAttributes ? styles.methodsContainer(darkMode) : ""}>
          {methods.map((method) => {
            const methodName = Object.keys(method)[0];
            const params = method[methodName];
            return (
              <div key={methodName} className={styles.methodItem(darkMode)}>
                <p className={styles.methodText(darkMode)}>+ {methodName}({params.join(', ')})</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}