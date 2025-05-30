import React, { useState } from 'react'

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
      style={{
        position: 'relative',
        width: toolbarOpen ? 260 : 32,
        transition: 'width 0.3s',
        background: '#f4f6fa',
        borderRight: '1px solid #e0e0e0',
        overflow: 'hidden',
        zIndex: 10,
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#222', // Ensure text is visible on light background
      }}
      onMouseEnter={() => setToolbarOpen(true)}
      onMouseLeave={() => setToolbarOpen(false)}
    >
      <div style={{
        width: 32,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        background: '#e9ecef',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
      }}>
        <span style={{
          display: 'inline-block',
          transform: toolbarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
          fontSize: 20,
          color: '#333', // Make arrow visible on light background
        }}>&#x25B6;</span>
      </div>
      {toolbarOpen && (
        <div style={{ padding: '16px 12px', width: 228 }}>
          <h3 style={{ fontSize: 16, marginBottom: 12, color: '#333' }}>Syntax Examples</h3>
          {syntaxExamples.map((ex, idx) => (
            <div key={idx} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{ex.title}</div>
              <pre style={{
                background: '#222',
                color: '#fff',
                borderRadius: 6,
                padding: '8px 10px',
                fontSize: 13,
                overflowX: 'auto',
              }}>{ex.code}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

