import React, { useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import * as styles from "../assets/Style.jsx";
import { darkModeContext } from "../App.jsx";
import { createNew } from '../assets/svgs.jsx';

/**
 * HomePage.jsx
 * ------------
 * Main landing page component.
 * 
 * - Shows a welcome message.
 * - If user is logged in, displays their email and a button to create a new diagram.
 * - If user is not logged in, displays Login and Sign Up buttons.
 * - Always shows information about the tool and an "About Us" section.
 * - Supports dark mode styling.
 */
export default function HomePage() {
  // Get dark mode state from context
  const { darkMode } = useContext(darkModeContext);

  // Get login/signup handlers and user info from outlet context (provided by parent route)
  const { onLoginClick, onSignUpClick, user } = useOutletContext();

  return (
    <div className={styles.pageContainer(darkMode)}>
      <div className={styles.contentContainer(darkMode)}>
        {/* Welcome message, shows user's email if logged in */}
        <h1 className={styles.title(darkMode)}>
          {user
            ? <>Welcome, <span className="text-blue-500">{user.email}</span></>
            : "Welcome to Text to Class Diagram!"
          }
        </h1>

        {/* If user is logged in, show create diagram button */}
        {user && (
          <div className={styles.buttonGroup(darkMode)}>
            <Link className={styles.icon} to="/app" title="Create new diagram">
              <img width="30px" src={createNew} alt="Create new diagram" />
            </Link>
            {/* Description below the button */}
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center w-full">
              Create a new diagram!
            </div>
          </div>
        )}

        {/* Always show tool description */}
        <p className={styles.paragraph(darkMode)}>
          Our tool lets you easily and quickly convert your text descriptions into clear, structured Class Diagrams. Simply upload or input your text, and get a detailed diagram representing the classes, attributes, and their relationships.
        </p>
        <p className={styles.paragraph(darkMode)}>
          Perfect for developers and students who want to understand and document their data model in a simple and convenient way.
        </p>
        <p className={styles.paragraph(darkMode)}>
          Get started now — convert your text to Class Diagram and use it directly in your project!
        </p>

        {/* If user is not logged in, show Login and Sign Up buttons */}
        {!user && (
          <div className={styles.buttonGroup(darkMode)}>
            <button className={styles.loginButton(darkMode)} onClick={onLoginClick}>
              Login
            </button>
            <button className={styles.signUpButton(darkMode)} onClick={onSignUpClick}>
              Sign Up
            </button>
          </div>
        )}

        {/* About Us section */}
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
