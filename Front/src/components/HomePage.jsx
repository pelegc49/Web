import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HomePage() {
  const { onLoginClick, onSignUpClick } = useOutletContext();

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>Welcome to Class Diagram to Text!</h1>
        <p style={styles.paragraph}>
          Our tool lets you easily and quickly convert your Class Diagrams into clear, structured text. Simply upload or input your diagram, and get a detailed description of the classes, attributes, and their relationships.
        </p>
        <p style={styles.paragraph}>
          Perfect for developers and students who want to understand and document their data model in a simple and convenient way.
        </p>
        <p style={styles.paragraph}>
          Get started now — convert your diagram to text and use it directly in your project!
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.loginButton} onClick={onLoginClick}>
            Login
          </button>
          <button style={styles.signUpButton} onClick={onSignUpClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    maxWidth: '600px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
  },
  paragraph: {
    marginBottom: '16px',
    fontSize: '16px',
    color: '#555',
  },
  buttonGroup: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  loginButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  signUpButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
