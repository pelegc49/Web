import React from "react";
import * as styles from "./Style";
import { use } from "react";

export default function ClassNode({ className, attributes, methods }) {
  // Destructure the data from JsonData

  // const { className, attributes, methods } = JsonData.data;
  console.log("Rendering ClassNode with methods:", methods);
  return (
    <div className={styles.classNodeContainer}>
      <h2 className={styles.classNodeTitle}>{className}</h2>
      <div className="mb-2">
        {attributes.map((attr, index) => (
          <div key={index} className={styles.attributeItem}>
            <p className={styles.attributeText}>- {attr}</p>
          </div>
        ))}
      </div>
      <div className={styles.methodsContainer}>
          {methods.map((method) =>{
              const methodName = Object.keys(method)[0];
              const params = method[methodName];
              return (
                <div key={methodName} className={styles.methodItem}>
                  <p className={styles.methodText}>+ {methodName}({params.join(', ')})</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}