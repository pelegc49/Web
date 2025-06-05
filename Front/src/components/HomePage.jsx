import React, { useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import * as styles from "../assets/Style.jsx";
import { darkModeContext } from "../App.jsx";
import { createNew } from '../assets/svgs.jsx';

export default function HomePage() {
  const { darkMode } = useContext(darkModeContext);
  const { onLoginClick, onSignUpClick, user } = useOutletContext();

  // If user is logged in, show welcome screen
  if (user) {
    return (
      <div className={styles.pageContainer(darkMode)}>
        <div className={styles.contentContainer(darkMode)}>
          <h1 className={styles.title(darkMode)}>
            Welcome, <span className="text-blue-500">{user.email}</span>
          </h1>
          <div className={styles.buttonGroup(darkMode)}>
            <Link className={styles.icon} to="/app" title="Create new diagram">
              <img width="30px" src={createNew} alt="Create new diagram" />
            </Link>
          </div>
          <div className={styles.paragraph(darkMode)}>
            Click the + to create a new diagram.
          </div>
        </div>
      </div>
    );
  }

  // If not logged in, show the original landing page
  return (
    <div className={styles.pageContainer(darkMode)}>
      <div className={styles.contentContainer(darkMode)}>
        <h1 className={styles.title(darkMode)}>Welcome to Text to Class Diagram!</h1>
        <p className={styles.paragraph(darkMode)}>
          Our tool lets you easily and quickly convert your text descriptions into clear, structured Class Diagrams. Simply upload or input your text, and get a detailed diagram representing the classes, attributes, and their relationships.
        </p>
        <p className={styles.paragraph(darkMode)}>
          Perfect for developers and students who want to understand and document their data model in a simple and convenient way.
        </p>
        <p className={styles.paragraph(darkMode)}>
          Get started now — convert your text to Class Diagram and use it directly in your project!
        </p>
        <div className={styles.buttonGroup(darkMode)}>
          <button className={styles.loginButton(darkMode)} onClick={onLoginClick}>
            Login
          </button>
          <button className={styles.signUpButton(darkMode)} onClick={onSignUpClick}>
            Sign Up
          </button>
        </div>
        <div className={styles.aboutUsContainer(darkMode)}>
          <h2 className={styles.aboutUsTitle(darkMode)}>About Us</h2>
          <p className={styles.aboutUsParagraph(darkMode)}>
            We are a passionate team of developers and educators dedicated to making software design easier and more accessible. Our mission is to help users transform their ideas into clear, visual representations, streamlining the process of understanding and documenting data models. We believe in the power of intuitive tools to empower learning and productivity for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
