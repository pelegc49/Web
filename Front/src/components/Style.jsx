// Toolbar styles
export const toolbarContainer = dark => "w-full shadow-sm flex justify-center items-center py-1 border-b " + (dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200");
export const toolbarNav = "flex items-center space-x-6";
export const toolbarLink = dark => "font-medium transform transition-all duration-200 px-3 py-2 rounded-md hover:scale-110 " + 
    (dark ? "text-gray-300 hover:text-white hover:bg-gray-600 hover:shadow-lg" : "text-gray-600 hover:text-blue-600 hover:bg-gray-200 hover:shadow-md");
export const toolbarDivider = dark => dark ? "text-gray-600" : "text-gray-300";

export const classNodeContainer = dark => `rounded-lg shadow-md border p-4 m-2 hover:shadow-lg transition-shadow ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`;
export const classNodeTitle = dark => `font-bold text-lg border-b pb-2 mb-2 text-center ${dark ? "text-gray-100 border-gray-600" : "text-blue-700 border-gray-200"}`;
export const attributeItem = dark => `py-1 px-2 rounded ${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`;
export const attributeText = dark => `text-sm ${dark ? "text-gray-300" : "text-gray-700"}`;
export const methodsContainer = dark => `mt-2 pt-2 border-t ${dark ? "border-gray-600" : "border-gray-200"}`;
export const methodItem = dark => `py-1 px-2 rounded ${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`;
export const methodText = dark => `text-sm ${dark ? "text-gray-300" : "text-gray-700"}`;
// TextArea component styles
export const textAreaContainer = "w-full h-full flex justify-center";

export const textArea = "flex-col w-full p-3 rounded-lg border border-gray-300 text-base font-sans h-[85vh] resize-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 max-w-[95vw] mx-auto";
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

// History component styles
export const historyContainer = dark => `p-8 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`;

export const historyContent = dark => `mx-auto max-w-2xl p-6 rounded-lg shadow-md ${dark ? 'bg-gray-800' : 'bg-white'}`;

export const historyHeader = "flex justify-between items-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-600";

export const historyTitle = dark => `text-2xl font-bold ${dark ? '' : ''}`;

export const historyAddLink = "hover:opacity-80 transition-opacity";

export const historyAddIcon = dark => `${dark ? 'filter-white' : ''}`;

// HistoryList component styles
export const historyListContainer = "space-y-2";

export const historyItemContainer = dark => `p-3 rounded-lg border ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} flex justify-between items-center`;

export const historyItemText = dark => dark ? "text-gray-200" : "text-gray-700";

export const historyButtonsContainer = "flex space-x-2";

export const historyOpenButton = dark => `px-2 py-1 text-xs rounded-md ${dark ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`;

export const historyDeleteButton = dark => `px-2 py-1 text-xs rounded-md ${dark ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`;

export const historyLoadingContainer = "flex justify-center items-center py-5";

export const historyLoadingSpinner = "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500";

export const historyEmptyContainer = dark => `text-center py-6 ${dark ? "text-gray-400" : "text-gray-500"}`;

export const historyCreateButton = dark => `mt-3 px-3 py-1 rounded-md ${dark ? 'bg-blue-600' : 'bg-blue-500'} text-white`;

// Tooltip styles
export const tooltipContainer = () => 
  "relative group";

export const tooltip = (darkMode) => 
  `absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 -left-14 top-10 ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800 border border-gray-200"
  } text-xs rounded py-1 px-2 whitespace-nowrap z-10 shadow-md`;