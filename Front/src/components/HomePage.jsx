import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useContext } from 'react';
import { darkModeContext } from '../App.jsx';

export default function HomePage() {
  const { onLoginClick, onSignUpClick } = useOutletContext();
  const { darkMode } = useContext(darkModeContext);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-5">
      {/* Existing content */}
      <div className="max-w-xl text-center bg-white dark:bg-gray-900 p-10 rounded-xl shadow-lg">
        <h1 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-white">
          Welcome to Class Diagram to Text!
        </h1>
        <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
          Our tool lets you easily and quickly convert your Class Diagrams into clear, structured text. Simply upload or input your diagram, and get a detailed description of the classes, attributes, and their relationships.
        </p>
        <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
          Perfect for developers and students who want to understand and document their data model in a simple and convenient way.
        </p>
        <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
          Get started now — convert your diagram to text and use it directly in your project!
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button
            onClick={onLoginClick}
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-base transition"
          >
            Login
          </button>
          <button
            onClick={onSignUpClick}
            className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-base transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Professional About Us Card */}
      <section
        className={`mt-14 w-full max-w-4xl p-8 rounded-3xl shadow-lg border ${
          darkMode
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border-gray-700 text-white'
            : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">
          About Us
        </h2>
        <p className="mb-5 text-lg leading-relaxed">
          We are third-year Software Engineering students at Braude College of Engineering in Karmiel.  
          This project is our semester capstone, where we developed a tool that converts textual descriptions into UML Class Diagrams.
        </p>
        <p className="mb-5 text-lg leading-relaxed">
          Our aim is to facilitate software design and documentation by automating the transformation of natural language descriptions into structured class models.  
          This enhances clarity, reduces manual effort, and helps both students and professionals visualize complex data structures.
        </p>
        <p className="text-lg leading-relaxed italic text-gray-400 dark:text-gray-500">
          Built with dedication, clean code, and a focus on usability and accuracy.
        </p>
      </section>

    </div>
  );
}
