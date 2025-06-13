// This file contains the Toolbar component which displays a vertical toolbar with various UML modeling tools
// Each tool is represented by an icon and has a tooltip that explains its usage syntax

import React, { useContext } from 'react';
import { darkModeContext } from '../../App';
import {
  defining_classes,
  inheritance,
  defining_relationships,
  defining_methods,
  defining_attributes,
  exclamation_mark,
  comments
} from '../../assets/svgs';
import {
  verticalToolbarContainer,
  toolbarIconButton,
  toolbarIcon,
  toolbarTooltip,
  tooltipContainer
} from '../../assets/Style';

// Toolbar component provides a vertical set of modeling tools with tooltips
// It supports dark mode through context and displays icons for different UML operations
export default function Toolbar() {
  // Get dark mode state from context
  const { darkMode } = useContext(darkModeContext);

  // Define the tools array with icons and their corresponding tooltip messages
  // Each tool represents a different UML modeling operation
  const tools = [
    { icon: defining_classes, tooltip: "Add class: a <className> is a class." },
    { icon: inheritance, tooltip: "Add inheritance: a <className> is a <className>." },
    { icon: defining_relationships, tooltip: "Add relationships: many <className> is related to one <className>." },
    { icon: defining_methods, tooltip: "Add method: <className> can <met3> with <atr1>, <atr2>." },
    { icon: defining_attributes, tooltip: "Add attributes: <className> has <atr1>, <atr2>." },
    { icon: exclamation_mark, tooltip: "Don't forget to add a period at the end of a sentence!" },
    { icon: comments, tooltip: "Add comments: #" }
  ];

  return (
    <div className={verticalToolbarContainer(darkMode)}>
      {tools.map((tool, index) => (
        <div key={index} className={tooltipContainer()}>
          <div className={toolbarIconButton(darkMode)}>
            <img 
              src={tool.icon} 
              alt={tool.tooltip}
              className={toolbarIcon(darkMode)}
            />
          </div>
          <div className={toolbarTooltip(darkMode)}>
            {tool.tooltip}
          </div>
        </div>
      ))}
    </div>
  );
}

