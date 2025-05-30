import React, { useContext } from 'react';
import { darkModeContext } from '../../App';
import {
  defining_classes,
  inheritance,
  defining_relationships,
  defining_methods,
  defining_attributes,
  exclamation_mark,
  components
} from '../../assets/svgs';
import {
  verticalToolbarContainer,
  toolbarIconButton,
  toolbarIcon,
  toolbarTooltip,
  tooltipContainer
} from '../../assets/Style';

export default function Toolbar() {
  const { darkMode } = useContext(darkModeContext);

  const tools = [
    { icon: defining_classes, tooltip: "a <className> is a class." },
    { icon: inheritance, tooltip: "a <className> is a <className>." },
    { icon: defining_relationships, tooltip: "many <className> is related to one <className>." },
    { icon: defining_methods, tooltip: "Add Method: <className> can <met3> with <atr1>, <atr2>." },
    { icon: defining_attributes, tooltip: "Add Attributes: <className> has <atr1>, <atr2>." },
    { icon: exclamation_mark, tooltip: "Don't forget to add a period at the end of a sentence!" },
    { icon: components, tooltip: "Add Component: #" }
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

