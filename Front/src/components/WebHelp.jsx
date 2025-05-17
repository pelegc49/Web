import React from "react";
import * as styles from "./Style";

export default function WebHelp() {
  return (
    <div className={styles.webHelpContainer}>
      <h2 className={styles.webHelpTitle}>Getting Started</h2>
      
      <p className={styles.webHelpIntro}>
        Welcome to our class diagram design tool. Follow these three simple steps to begin creating professional diagrams:
      </p>
      
      <div className={styles.webHelpSteps}>
        <div className={styles.webHelpStep}>
          <span className={styles.webHelpStepNumber}>1</span>
          <div className={styles.webHelpStepContent}>
            <h3 className={styles.webHelpStepTitle}>Create Your Account</h3>
            <p className={styles.webHelpStepDescription}>
              Navigate to the main screen and click on the profile icon in the navigation bar. 
              Select "Sign Up" to create your personal account for saving and managing your diagrams.
            </p>
          </div>
        </div>
        
        <div className={styles.webHelpStep}>
          <span className={styles.webHelpStepNumber}>2</span>
          <div className={styles.webHelpStepContent}>
            <h3 className={styles.webHelpStepTitle}>Start a New Diagram</h3>
            <p className={styles.webHelpStepDescription}>
              From your dashboard, click the "Create Class Diagram" button to begin a new project. 
              You'll be directed to the diagram editor where you can start designing.
            </p>
          </div>
        </div>
        
        <div className={styles.webHelpStep}>
          <span className={styles.webHelpStepNumber}>3</span>
          <div className={styles.webHelpStepContent}>
            <h3 className={styles.webHelpStepTitle}>Define Your Classes</h3>
            <p className={styles.webHelpStepDescription}>
              Use our intuitive syntax to define classes, attributes, and relationships. 
              Need help with formatting? Click on "Syntax Help" to view a comprehensive guide with examples.
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.webHelpFooter}>
        <p>
          Ready to create powerful visualizations of your system architecture? Start now and transform 
          your ideas into clear, professional class diagrams.
        </p>
      </div>
    </div>
  );
}