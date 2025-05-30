import React, { useContext } from "react";
import * as styles from "../../assets/Style.jsx";
import { darkModeContext } from "../../App.jsx";

export default function ClassNode({ className, attributes, methods }) {
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  
  const hasAttributes = attributes && attributes.length > 0;
  const hasMethods = methods && methods.length > 0;
  const hasContent = hasAttributes || hasMethods;
  
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