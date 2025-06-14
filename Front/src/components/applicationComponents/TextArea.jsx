import React, {useEffect, useState } from "react";
import * as styles from "../../assets/Style";

export default function TextArea({ onContentChange, placeholder, initialValue = "" ,children}) {
  const [content, setContent] = useState(initialValue);
  useEffect(()=>{
    setContent(initialValue)
  },[initialValue])
  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    // Transfer content to parent component if callback is provided
    if (onContentChange) {
      onContentChange(e.target.value);
    }
  };
  return (
    <div className={styles.textAreaContainer}>
      <textarea
      
        className={styles.textArea}
        value={content}
        onChange={handleChange}
        placeholder={placeholder || "Enter your text here..."}
        rows={20}
      />
      {children}
    </div>
  );
}