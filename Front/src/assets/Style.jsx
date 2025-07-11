// Toolbar styles
export const toolbarContainer = dark => "w-full shadow-sm flex justify-center items-center py-1 border-b " + (dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200");
export const toolbarNav = "flex items-center space-x-6";
export const toolbarLink = dark => "font-medium transform transition-all duration-200 px-3 py-2 rounded-md hover:scale-110 " + 
    (dark ? "text-gray-300 hover:text-white hover:bg-gray-600 hover:shadow-lg" : "text-gray-600 hover:text-blue-600 hover:bg-gray-200 hover:shadow-md");
export const toolbarDivider = dark => dark ? "text-gray-600" : "text-gray-300";

export const classNodeContainer = dark => `rounded-lg shadow-md border p-4 m-2 hover:shadow-lg transition-shadow ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`;
export const classNodeTitle = dark => `font-bold text-lg pb-2 mb-2 text-center flex flex-row gap-4 items-center justify-center ${dark ? "text-gray-100" : "text-blue-700"}`;
export const attributeItem = dark => `py-1 px-2 rounded ${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`;
export const attributeText = dark => `text-sm ${dark ? "text-gray-300" : "text-gray-700"}`;
export const methodsContainer = dark => `mt-2 pt-2 border-t ${dark ? "border-gray-600" : "border-gray-200"}`;
export const methodItem = dark => `py-1 px-2 rounded ${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`;
export const methodText = dark => `text-sm ${dark ? "text-gray-300" : "text-gray-700"}`;
// TextArea component styles
export const textAreaContainer = "h-[calc(50vh-4rem)] md:h-[calc(100vh-4rem)] w-full flex relative";
export const textArea = "w-full p-3 rounded-lg border border-gray-300 text-base font-sans h-full resize-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400";

export const headerContainer = dark =>
  // Responsive: flex-col on mobile, flex-row on desktop, with padding and spacing
  `p-4 h-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 text-white duration-200 ease-in-out ` +
  (dark ? "bg-gray-500" : "bg-gray-300");

export const logo =
  // Responsive: center on mobile, left on desktop
  "cursor-pointer text-black font-bold text-2xl duration-300 ease-in-out hover:opacity-30 text-center md:text-left w-full md:w-auto";

export const icon =
  // Responsive: increase spacing and size on mobile
  "cursor-pointer mx-2 md:mx-1 duration-300 ease-in-out hover:opacity-30 w-8 h-8 md:w-[30px] md:h-[30px]";

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
export const historyContainer = dark => `min-h-screen w-full max-w-full overflow-x-hidden p-4 sm:p-8 box-border ${dark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col`;

export const historyContent = dark => `mx-auto max-w-2xl w-full p-6 rounded-lg shadow-md ${dark ? 'bg-gray-800' : 'bg-white'}`;

export const historyHeader = "flex justify-between items-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-600";

export const historyTitle = dark => `text-2xl font-bold ${dark ? '' : ''}`;

export const historyAddLink = "hover:opacity-80 transition-opacity";

export const historyAddIcon = dark => `${dark ? 'filter-white' : ''}`;

// HistoryList component styles
export const historyListContainer = "space-y-2";

export const historyItemContainer = dark => `p-3 rounded-lg border ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} flex justify-between items-center`;

export const historyItemText = dark => dark ? "text-gray-200" : "text-gray-700";

export const historyButtonsContainer = "flex space-x-2 items-center";

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
  `absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 left-14 top-0 ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800 border border-gray-200"
  } text-xs rounded py-1 px-2 whitespace-nowrap z-10 shadow-md`;

// HomePage component styles
export const pageContainer = dark => `flex justify-center items-center min-h-screen p-5 ${dark ? 'bg-gray-900' : 'bg-gray-100'}`;

export const contentContainer = dark => `max-w-xl w-full text-center p-10 rounded-xl shadow-lg ${dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`;

export const title = dark => `mb-5 text-3xl font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`;

export const paragraph = dark => `mb-4 text-base ${dark ? 'text-gray-300' : 'text-gray-700'}`;

export const buttonGroup = dark => `mt-6 flex justify-center gap-4 flex-wrap`;

export const loginButton = dark => `px-6 py-3 text-base rounded-lg font-semibold bg-blue-600 text-white border-none cursor-pointer hover:bg-blue-700 transition`;

export const signUpButton = dark => `px-6 py-3 text-base rounded-lg font-semibold bg-green-600 text-white border-none cursor-pointer hover:bg-green-700 transition`;

export const aboutUsContainer = dark => `mt-10 p-6 rounded-lg shadow-md ${dark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`;

export const aboutUsTitle = dark => `text-xl font-bold mb-3 ${dark ? 'text-gray-100' : 'text-gray-800'}`;

export const aboutUsParagraph = dark => `text-base ${dark ? 'text-gray-300' : 'text-gray-700'}`;

// Toolbar (side panel) styles
export const verticalToolbarContainer = dark => 
  `fixed md:static bottom-0 left-0 right-0 md:w-14 md:h-[calc(100vh-4rem)] border-t md:border-t-0 md:border-r z-20
   flex flex-row md:flex-col items-center justify-evenly md:justify-start py-2 md:py-4 md:space-y-4 space-x-4 md:space-x-0
   ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`;

export const toolbarIconButton = dark => 
  `w-8 h-8 rounded-lg p-1.5 cursor-pointer transition-all duration-200 hover:scale-110 ${
    dark ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
  }`;

export const toolbarIcon = dark => 
  `w-full h-full ${dark ? "filter invert" : ""}`;

export const toolbarTooltip = dark => 
  `absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 
   transition-opacity duration-300 left-14 top-1/2 -translate-y-1/2 
   py-1 px-3 rounded-md shadow-lg text-sm whitespace-nowrap z-50 ${
    dark ? "bg-gray-700 text-gray-100" : "bg-white text-gray-800 border border-gray-200"
  }`;

// Application component styles
export const applicationContainer = dark => `w-full h-[calc(100vh-4rem)] flex flex-col md:flex-row ${dark ? 'bg-gray-900' : 'bg-gray-100'}`;
export const textAreaSection = "w-full md:w-1/3 h-[50vh] md:h-full";
export const textAreaWrapper = "relative h-full";
export const diagramSection = "w-full md:w-2/3 h-[50vh] md:h-full relative";

export const errorMessage = "absolute bottom-2 left-2 right-2 text-red-500 text-lg";
export const saveButtonWrapper = "fixed md:absolute top-auto bottom-20 md:bottom-auto md:top-2 right-2 z-[40]";
export const downloadButtonWrapper = "fixed md:absolute top-auto bottom-20 md:bottom-auto md:top-14 right-12 md:right-2 z-[40]";
export const saveButton = dark => `p-2 rounded-full transition-colors ${
    dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
}`;
export const saveButtonIcon = "w-6 h-6";
export const saveButtonTooltip = dark => `absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 
  transition-opacity duration-200 right-full mr-2 top-1/2 -translate-y-1/2 
  py-1 px-2 rounded text-sm whitespace-nowrap z-[40] ${
    dark ? "bg-gray-700 text-gray-100" : "bg-white text-gray-800 border border-gray-200"
} shadow-md`;

// SaveProject component styles
export const saveProjectModal = "fixed inset-0 backdrop-filter backdrop-blur-sm bg-black/30 flex justify-center items-center transition-all duration-300 z-50";
export const saveProjectContent = dark => `p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
    dark ? 'bg-gray-800/95 text-white' : 'bg-white/95 text-gray-800'
}`;
export const saveProjectTitle = "text-2xl font-bold mb-6 text-center";
export const saveProjectInputGroup = "mb-6";
export const saveProjectLabel = "block text-sm font-medium mb-2 tracking-wide";
export const saveProjectInput = dark => `w-full p-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${
    dark 
        ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
        : 'bg-gray-50/50 border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-blue-600'
}`;
export const saveProjectButtonGroup = "flex justify-end gap-4";
export const saveProjectCancelButton = dark => `px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
    dark 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white' 
        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
}`;
export const saveProjectSaveButton = "px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105";

// Welcome Screen styles
export const welcomeScreenContainer = dark => 
  "min-h-screen flex flex-col items-center justify-center p-8 text-center";

export const welcomeScreenContent = dark => 
  `max-w-2xl w-full p-8 rounded-xl shadow-2xl transform transition-all duration-300 ${
    dark ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-800'
  }`;

export const welcomeScreenTitle = 
  "text-3xl font-bold mb-6";

export const welcomeScreenDescription = 
  "mb-12";

export const welcomeScreenParagraph = 
  "text-lg mb-4 opacity-90";

export const welcomeScreenSecondaryText = 
  "text-md opacity-80";

export const welcomeScreenButtonContainer = 
  "flex flex-col items-center gap-4";

export const welcomeScreenSignInButton = 
  "px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 w-full max-w-md transform hover:scale-105";

export const welcomeScreenSignUpText = dark => 
  `text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`;

export const welcomeScreenSignUpLink = 
  "text-blue-500 hover:underline";

export const modalContainer = dark =>
  `bg-white ${dark ? "dark:bg-gray-800" : ""} text-gray-800 ${dark ? "dark:text-gray-100" : ""} rounded-xl shadow-xl p-6 w-80`;

export const input = dark =>
  `w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : ""}`;

export const label = dark =>
  `block text-sm font-medium mb-1 ${dark ? "text-gray-200" : "text-gray-700"}`;

export const buttonPrimary = dark =>
  `flex-1 py-2 px-4 rounded-md text-white text-sm font-medium ${dark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"}`;

export const buttonSecondary = dark =>
  `flex-1 py-2 px-4 rounded-md text-white text-sm font-medium ${dark ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"}`;
export const sushiImage = dark => `w-8 h-8 center ${dark ? "filter" : ""}`;