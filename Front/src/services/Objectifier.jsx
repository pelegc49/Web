// Objectifier.jsx
// This service takes parsed natural language input and converts it into a diagram data structure (nodes and edges)
// for use with React Flow. It supports class definitions, inheritance, attributes, methods, and relationships.

import { MarkerType } from '@xyflow/react';
import ClassNode from '../components/diagramComponents/ClassNode.jsx';

// Calculate the Levenshtein distance (edit distance) between two strings for typo correction suggestions
function levinshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    return Math.min(
        levinshteinDistance(a.slice(1), b) + 1, // deletion
        levinshteinDistance(a, b.slice(1)) + 1, // insertion
        levinshteinDistance(a.slice(1), b.slice(1)) + (a[0] === b[0] ? 0 : 1), // substitution
        levinshteinDistance(a.slice(2), b.slice(2)) + ((a[0] === b[1])&&(a[1] === b[0]) ? 1 : 2) // transposition
    );
}

// Find the closest word in a map to the input string using Levenshtein distance
function getMinDistance(input, map) {
    let minDistance = Infinity;
    let closestWord = '';
    map.forEach((_,word) => {
        const distance = levinshteinDistance(input, word);
        if (distance < minDistance) {
            minDistance = distance;
            closestWord = word;
        }
    });
    return { minDistance, closestWord };
}

// Main function: converts parsed data into nodes and edges for the diagram
export function objectify(data) {
    // Map to track defined classes and their indices in the nodes array
    const definedClasses = new Map();

    let index = 0; // Used to assign node indices
    let status = 'SUCCESS'; // Status of the objectification process
    let message = ''; // Error or info message
    const nodes = []; // Array of node objects for the diagram
    const edges = []; // Array of edge objects for the diagram
    const sentences = data.children; // Parsed sentences from the input

    // Iterate over each parsed sentence and process according to its type
    for (const sentence of sentences) {
        if (sentence.type === 'DEF') {
            // Handle class definition, e.g., "a Person is a class."
            const className = sentence.children[1].value;
            const attributes = [];
            const methods = [];
            // Check for duplicate class definition
            if (definedClasses.has(className)) {
                status = 'ERROR';
                message = `Class ${className} is already defined`;
                return { status, message, nodes, edges };
            }
            definedClasses.set(className, index++);
            const data ={ className, attributes, methods }
            // Create a React node for the class
            const content = <ClassNode className={className} attributes={attributes} methods={methods} />;
            nodes.push({
                id: className,
                data:{
                    ...data,
                    label: content
                    },
                position: { x: 0, y: 0 },
                width: 300,
                height: content.height,
            });
        } else if (sentence.type === 'INHER') {
            // Handle inheritance, e.g., "a Student is a Person."
            const attributes = [];
            const methods = [];
            const childClass = sentence.children[1].value;
            const parentClass = sentence.children[4].value;
            // Check for duplicate child class
            if (definedClasses.has(childClass)) {
                status = 'ERROR';
                message = `Class ${childClass} is already defined`;
                return { status, message, nodes, edges };
            }
            // Check if parent class is defined
            if (!definedClasses.has(parentClass)) {
                const {minDistance, closestWord} = getMinDistance(parentClass, definedClasses);
                if (minDistance < 3) {
                    status = 'ERROR';
                    message = `Parent class ${parentClass} is not defined, did you mean ${closestWord}?`;
                } else {
                    status = 'ERROR';
                    message = `Parent class ${parentClass} is not defined.`;
                }
                break;
            }
            const data ={ childClass, attributes, methods }
            definedClasses.set(childClass, index++);
            // Create a React node for the child class
            const content = <ClassNode className={childClass} attributes={attributes} methods={methods} />;
            content.height
            nodes.push({
                id: childClass,
                data:{
                    ...data,
                    label: content
                    },
                position: { x: 0, y: 0 },           
                width: 300,
                height: content.height,
            });
            // Add an edge representing inheritance (child -> parent)
            edges.push({
                id: `${childClass}-${parentClass}`,
                source: childClass,
                target: parentClass,
                type: "step",
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 60,
                    height: 60,
                    color: '#c53030',
                }   
            });
        } else if (sentence.type === 'ATR') {
            // Handle attribute definition, e.g., "Person has name, age, ..."
            const className = sentence.children[0].value;
            // Check if class is defined
            if (!definedClasses.has(className)) {
                const {minDistance, closestWord} = getMinDistance(className, definedClasses);
                if (minDistance < 3) {
                    status = 'ERROR';
                    message = `Class ${className} is not defined, did you mean ${closestWord}?`;
                } else {
                    status = 'ERROR';
                    message = `Class ${className} is not defined.`;
                }
                break;
            }
            const currIndex = definedClasses.get(className);
            // Add each attribute to the class node's data
            for (const child of sentence.children[2].children) {
                nodes[currIndex].data.attributes.push(child.value);
            }
        } else if (sentence.type === 'MET') {
            // Handle method definition, e.g., "Person can run." or "Person can jump with howFar, howHigh."
            const className = sentence.children[0].value;
            // Check if class is defined
            if (!definedClasses.has(className)) {
                const {minDistance, closestWord} = getMinDistance(className, definedClasses);
                if (minDistance < 3) {
                    status = 'ERROR';
                    message = `Class ${className} is not defined, did you mean ${closestWord}?`;
                } else {
                    status = 'ERROR';
                    message = `Class ${className} is not defined.`;
                }
                break;
            }
            const methodName = sentence.children[2].value;
            const currIndex = definedClasses.get(className);
            // Check if method has parameters (WITH)
            if(sentence.children[3].type === 'WITH') {
                const params = []
                for (const child of sentence.children[4].children) {
                    params.push(child.value);
                }
                const method = { [methodName]: params };
                nodes[currIndex].data.methods.push(method);
            }
            else{
                const params = []
                const method = { [methodName]: params };
                nodes[currIndex].data.methods.push(method);
            }
        }else if (sentence.type === 'REL') {
            // Handle relationship sentences, e.g., "one X is related to many Y"
            const sourceClass = sentence.children[1].value; // Source class name
            const targetClass = sentence.children[6].value; // Target class name
            // Determine multiplicity (one/many) for source and target
            const multSource = sentence.children[0].value === 'one' ? '1' : '*';
            const multTarget = sentence.children[5].value === 'one' ? '1' : '*';
            // Check if source class is defined
            if (!definedClasses.has(sourceClass)) {
                const {minDistance, closestWord} = getMinDistance(sourceClass, definedClasses);
                if (minDistance < 3) {
                    status = 'ERROR';
                    message = `Source class ${sourceClass} is not defined, did you mean ${closestWord}?`;
                } else {
                    status = 'ERROR';
                    message = `Source class ${sourceClass} is not defined.`;
                }
                break;
            }
            // Check if target class is defined
            if (!definedClasses.has(targetClass)) {
                const {minDistance, closestWord} = getMinDistance(targetClass, definedClasses);
                if (minDistance < 3) {
                    status = 'ERROR';
                    message = `Target class ${targetClass} is not defined, did you mean ${closestWord}?`;
                } else {
                    status = 'ERROR';
                    message = `Target class ${targetClass} is not defined.`;
                }
                break;
            }
            // Add an edge representing the relationship between source and target classes
            edges.push({
                id: `${sourceClass}-${targetClass}`,
                source: sourceClass,
                target: targetClass,
                type: "labelled", // Custom edge type for labelled relationships
                markerEnd: {
                    width: 20,
                    height: 20,
                    color: '#000000',
                },
                data: {
                    startLabel: multSource, // Multiplicity label for source
                    endLabel: multTarget,   // Multiplicity label for target
                }
            });
        }
    }
    // Return the status, message, and the constructed nodes and edges for the diagram
    return { status, message, nodes, edges };
}

/*
Example input and output for objectify:

Input (parsed):
a Person is a class.
Person has name, age, height, weight.
a Student is a Person.


input:
{
"type": "START",
"children": [
    {
    "type": "DEF",
    "children": [
        { "type": "A", "value": "a" },
        { "type": "ID", "value": "Person" },
        { "type": "IS", "value": "is" },
        { "type": "A", "value": "a" },
        { "type": "CLASS", "value": "class" },
        { "type": "DOT", "value": "." }
    ]
    },
    {
    "type": "ATR",
    "children": [
        { "type": "ID", "value": "Person" },
        { "type": "HAS", "value": "has" },
        {
            "type": "LIST",
            "children": [
                { "type": "ID", "value": "name" },
                { "type": "ID", "value": "age" },
                { "type": "ID", "value": "height" },
                { "type": "ID", "value": "weight" }
            ]
        },
        { "type": "DOT", "value": "." }
    ]
    },
    {
    "type": "MET",
    "children": [
        { "type": "ID", "value": "Person" },
        { "type": "CAN", "value": "can" },
        { "type": "ID", "value": "jump" },
        { "type": "WITH", "value": "with" },
        {
            "type": "LIST",
            "children": [
                { "type": "ID", "value": "howFar" },
                { "type": "ID", "value": "howHigh" }
            ]
        },
        { "type": "DOT", "value": "." }
    ]
    },
    {
    "type": "MET",
    "children": [
        { "type": "ID", "value": "Person" },
        { "type": "CAN", "value": "can" },
        { "type": "ID", "value": "speak" },
        { "type": "WITH", "value": "with" },
        {
            "type": "LIST",
            "children": [
                { "type": "ID", "value": "sentence" }
            ]
        },
        { "type": "DOT", "value": "." }
    ]
    },
    {
    "type": "MET",
    "children": [
        { "type": "ID", "value": "Person" },
        { "type": "CAN", "value": "can" },
        { "type": "ID", "value": "run" },
        { "type": "DOT", "value": "." }
    ]
    },
    {
    "type":"REL",
    "children": [
        {"type":"MULT","value":"one"},
        {"type":"ID","value":"Person"},
        {"type":"IS","value":"is"},
        {"type":"RELATED","value":"related"},
        {"type":"TO","value":"to"},
        {"type":"MULT","value":"many"},
        {"type":"ID","value":"House"},
        {"type":"DOT","value":"."}
    ]
    }
]
}



output:
{
nodes:[
{
    id: 'Person',
    data: { 
        className: 'Person',
	    attributes: ['name', 'age', 'height', 'weight'],
	    methods:[
            {
                jump:['howFar', 'howHigh']
            },
            {
                speak:['sentence']
            },
            {
                run: []
            }
        ]
    },
    position: {
      x: 0,
      y: 0,
    },
    width: 100,
    height: 150,
  }
],
edges:[{
    id: 'Student-Person',
    source: 'Student',
    target: 'Person',
    type: 'buttonedge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#000000',
    },
    data: {
      startLabel: '*',
      endLabel: '1',
    }
  }]

}

*/