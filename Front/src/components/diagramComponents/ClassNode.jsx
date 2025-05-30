import React, { useContext } from "react";
import * as styles from "../../assets/Style.jsx";
import { darkModeContext } from "../../App.jsx";

export default function ClassNode({ className, attributes, methods }) {
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  
  return (
    <div className={styles.classNodeContainer(darkMode)}>
      <h2 className={styles.classNodeTitle(darkMode)}>{className}</h2>
      <div className="mb-2">
        {attributes.map((attr, index) => (
          <div key={index} className={styles.attributeItem(darkMode)}>
            <p className={styles.attributeText(darkMode)}>- {attr}</p>
          </div>
        ))}
      </div>
      <div className={styles.methodsContainer(darkMode)}>
          {methods.map((method) =>{
              const methodName = Object.keys(method)[0];
              const params = method[methodName];
              return (
                <div key={methodName} className={styles.methodItem(darkMode)}>
                  <p className={styles.methodText(darkMode)}>+ {methodName}({params.join(', ')})</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}