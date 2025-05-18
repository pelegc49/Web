import React from 'react';
import * as styles from "./Style";

export default function SignUpHelp(){
  return (
    <div className={styles.signUpHelpContainer}>
      <h1 className={styles.signUpHelpTitle}>How to Sign Up</h1>
      
      <p className={styles.signUpHelpIntro}>
        Welcome to our application! Follow these instructions to create your account and get started.
      </p>
      
      <div className={styles.signUpHelpSections}>
        <div className={styles.signUpHelpSection}>
          <h2 className={styles.signUpHelpSectionTitle}>Creating Your Account</h2>
          <ul className={styles.signUpHelpList}>
            <li>Click on the "Sign Up" button in the top right corner of the page</li>
            <li>Enter your email address, username, and password</li>
            <li>Confirm your password by typing it again</li>
            <li>Click "Create Account" to proceed</li>
          </ul>
        </div>

        <div className={styles.signUpHelpSection}>
          <h2 className={styles.signUpHelpSectionTitle}>Password Requirements</h2>
          <ul className={styles.signUpHelpList}>
            <li>At least 8 characters long</li>
            <li>Contain at least one uppercase letter</li>
            <li>Contain at least one number</li>
            <li>Contain at least one special character</li>
          </ul>
          <p className={styles.signUpHelpNote}>
            Your password security is important! Choose a password that you don't use on other sites.
          </p>
        </div>

        <div className={styles.signUpHelpSection}>
          <h2 className={styles.signUpHelpSectionTitle}>CAPTCHA Verification</h2>
          <ul className={styles.signUpHelpList}>
            <li>Complete the CAPTCHA verification by following the on-screen instructions</li>
            <li>This helps us ensure you're a real person and not an automated bot</li>
            <li>If you have trouble with the CAPTCHA, you can click the refresh button to get a new one</li>
            <li>Audio options are available for accessibility needs</li>
          </ul>
          <p className={styles.signUpHelpNote}>
            CAPTCHA verification is a security measure that protects our platform and users from automated abuse.
          </p>
        </div>

        <div className={styles.signUpHelpSection}>
          <h2 className={styles.signUpHelpSectionTitle}>Verifying Your Account</h2>
          <ul className={styles.signUpHelpList}>
            <li>Check your email for a verification link</li>
            <li>Click on the verification link to activate your account</li>
            <li>If you don't receive an email within 5 minutes, check your spam folder or request a new verification email</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.signUpHelpFooter}>
        Need more help? Contact our support team at support@example.com
      </div>
    </div>
  );
};
