import React from "react";
import * as styles from "./Style";

export default function ClassNode({ JsonData }) {
  // Destructure the data from JsonData
  const { className, attributes, methods } = JsonData.data;

  return (
    <div className={styles.classNodeContainer}>
      <h2 className={styles.classNodeTitle}>{className}</h2>
      <hr/>
      <div className="mb-2">
        {attributes.map((attr, index) => (
          <div key={index} className={styles.attributeItem}>
            <p className={styles.attributeText}>- {attr}</p>
          </div>
        ))}
      </div>
      <hr/>
      <div className={styles.methodsContainer}>
        {Object.entries(methods).map(([methodName, params], index) => (
          <div key={index} className={styles.methodItem}>
            <p className={styles.methodText}>+ {methodName}({params.join(', ')})</p>
          </div>
        ))}
      </div>
    </div>
  );
}