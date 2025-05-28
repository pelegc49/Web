// Toolbar styles
export const toolbarContainer = dark => "w-full shadow-sm flex justify-center items-center py-1 border-b " + (dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200");
export const toolbarNav = "flex items-center space-x-6";
export const toolbarLink = dark => "font-medium transform transition-all duration-200 px-3 py-2 rounded-md hover:scale-110 " + 
    (dark ? "text-gray-300 hover:text-white hover:bg-gray-600 hover:shadow-lg" : "text-gray-600 hover:text-blue-600 hover:bg-gray-200 hover:shadow-md");
export const toolbarDivider = dark => dark ? "text-gray-600" : "text-gray-300";

export const classNodeContainer = "bg-white rounded-lg shadow-md border border-gray-300 p-4 m-2 hover:shadow-lg transition-shadow";
export const classNodeTitle = "font-bold text-lg border-b border-gray-200 pb-2 mb-2 text-blue-700 text-center";
export const attributeItem = "py-1 px-2 hover:bg-gray-100 rounded";
export const attributeText = "text-sm text-gray-700";
export const methodsContainer = "mt-2 pt-2 border-t border-gray-200";
export const methodItem = "py-1 px-2 hover:bg-gray-100 rounded";
export const methodText = "text-sm text-gray-700";
// TextArea component styles
export const textAreaContainer = "w-full my-2.5 flex justify-center";

export const textArea = "w-full p-3 rounded-lg border border-gray-300 text-base font-sans min-h-[150px] resize-vertical focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400";
export const headerContainer = dark => "p-4 flex justify-between text-white duration-200 ease-in-out " + (dark ? "bg-gray-500" : "bg-gray-300");
export const logo = "cursor-pointer text-black font-bold text-2xl duration-300 ease-in-out hover:opacity-30";
export const icon = "cursor-pointer mx-1 duration-300 ease-in-out hover:opacity-30";

// SyntaxHelp component styles
export const helpTextContainer = dark => `w-full max-w-4xl mx-auto p-6 rounded-lg shadow-md ${dark ? "bg-gray-800" : "bg-white"}`;

export const helpTextTitle = dark => `text-2xl font-bold mb-6 pb-2 border-b ${dark ? "text-gray-100 border-gray-600" : "text-gray-800 border-gray-200"}`;

export const helpTextSection = "mb-8";

export const helpTextSubtitle = dark => `text-xl font-semibold mb-3 ${dark ? "text-gray-100" : "text-gray-700"}`;

export const helpTextContent = dark => `mb-4 leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`;

export const codeBlock = dark => `p-4 rounded-md border font-mono text-sm overflow-x-auto whitespace-pre-wrap mb-4 ${
    dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-50 border-gray-200 text-gray-800"
}`;

export const example = dark => `italic pl-4 ${dark ? "text-green-400" : "text-green-600"}`;

// WebHelp component styles
export const webHelpContainer = dark => `w-full max-w-4xl mx-auto p-6 rounded-lg shadow-md ${dark ? "bg-gray-800" : "bg-white"}`;

export const webHelpTitle = dark => `text-2xl font-bold mb-4 pb-2 border-b ${dark ? "text-gray-100 border-gray-600" : "text-gray-800 border-gray-200"}`;

export const webHelpIntro = dark => `mb-8 ${dark ? "text-gray-300" : "text-gray-600"}`;

export const webHelpSteps = "space-y-8";

export const webHelpStep = dark => `flex items-start gap-4 p-4 rounded-lg border ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`;

export const webHelpStepNumber = "flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg";

export const webHelpStepContent = "flex-grow";

export const webHelpStepTitle = dark => `text-xl font-semibold mb-2 ${dark ? "text-gray-100" : "text-gray-700"}`;

export const webHelpStepDescription = dark => `leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`;

export const webHelpLink = dark => `underline ${dark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`;

export const webHelpFooter = dark => `mt-10 p-4 rounded-lg border ${dark ? "bg-gray-700 border-gray-600 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-700"}`;

// SignUpHelp component styles
export const signUpHelpContainer = dark => `w-full max-w-4xl mx-auto p-6 rounded-lg shadow-md ${dark ? "bg-gray-800" : "bg-white"}`;

export const signUpHelpTitle = dark => `text-2xl font-bold mb-4 pb-2 border-b ${dark ? "text-gray-100 border-gray-600" : "text-gray-800 border-gray-200"}`;

export const signUpHelpIntro = dark => `mb-8 ${dark ? "text-gray-300" : "text-gray-600"}`;

export const signUpHelpSections = "space-y-6";

export const signUpHelpSection = dark => `p-4 rounded-lg border ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`;

export const signUpHelpSectionTitle = dark => `text-xl font-semibold mb-2 ${dark ? "text-gray-100" : "text-gray-700"}`;

export const signUpHelpList = dark => `ml-6 my-3 space-y-2 list-disc ${dark ? "text-gray-300" : "text-gray-600"}`;

export const signUpHelpNote = dark => `text-sm italic mt-3 p-3 rounded ${dark ? "text-gray-300 bg-gray-600 border-l-4 border-blue-500" : "text-gray-600 bg-blue-50 border-l-4 border-blue-400"}`;

export const signUpHelpFooter = dark => `mt-10 p-4 rounded-lg border ${dark ? "bg-gray-700 border-gray-600 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-700"}`;

// styles.js
export const container = "fixed top-[60px] right-0 h-[calc(100vh-60px)] z-50 bg-white shadow-lg w-full sm:w-96 md:w-96 p-6 overflow-y-auto transition-all duration-300";

export const heading = "text-2xl font-semibold text-gray-800 mb-6";

export const form = "space-y-4";

export const label = "block text-sm font-medium text-gray-700";

export const input = "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

export const captchaCanvas = "border border-gray-300 rounded cursor-pointer my-2";

export const errorMsg = "text-red-500 text-sm";

export const successMsg = "text-green-600 text-sm";

export const buttonsWrapper = "flex justify-between mt-4 space-x-2";

export const submitButton = "flex-1 bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50";

export const cancelButton = "flex-1 bg-gray-300 text-gray-800 rounded-md py-2 font-semibold hover:bg-gray-400 transition duration-200";
