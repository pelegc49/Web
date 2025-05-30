import React, { useState } from 'react'
import {
  toolbarSidePanel,
  toolbarArrowContainer,
  toolbarArrowIcon,
  toolbarContent,
  toolbarSyntaxTitle,
  toolbarExampleContainer,
  toolbarExampleTitle,
  toolbarExampleCode
} from '../../assets/Style';

export default function Toolbar() {
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const syntaxExamples = [
    {
      title: 'Defining Classes',
      code: 'Example: a Car is a class.'
    },
    {
      title: 'Adding Attributes',
      code: 'Example: Person has name.'
    },
    {
      title: 'Adding Methods',
      code: 'Example: Person can walk.\nExample: Person can drive with license.\nExample: Person can purchase with money, itemId.'
    },
    {
      title: 'Defining Relationships',
      code: 'Example: one Person is related to one Car. (one-to-one)'
    },
    {
      title: 'Inheritance',
      code: 'Example: a Student is a Person.'
    },
    {
      title: 'Comments',
      code: '# This is a comment'
    }
  ];

  return (
    <div
      className={toolbarSidePanel(toolbarOpen)}
      onMouseEnter={() => setToolbarOpen(true)}
      onMouseLeave={() => setToolbarOpen(false)}
    >
      <div className={toolbarArrowContainer}>
        <span
          className={toolbarArrowIcon(toolbarOpen)}
        >&#x25B6;</span>
      </div>
      {toolbarOpen && (
        <div className={toolbarContent}>
          <h3 className={toolbarSyntaxTitle}>Syntax Examples</h3>
          {syntaxExamples.map((ex, idx) => (
            <div key={idx} className={toolbarExampleContainer}>
              <div className={toolbarExampleTitle}>{ex.title}</div>
              <pre className={toolbarExampleCode}>{ex.code}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

