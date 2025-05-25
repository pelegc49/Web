import { MarkerType} from '@xyflow/react';
import ClassNode from '../components/ClassNode.jsx';
export function objectify(data) {
    const definedClasses = new Map();
    let index = 0;
    let status = 'SUCCESS';
    let message = '';
    const nodes = [];
    const edges = [];
    const sentences = data.children;
    for (const sentence of sentences) {
        if (sentence.type === 'DEF') {
            const className = sentence.children[1].value;
            const attributes = [];
            const methods = [];
            if (definedClasses.has(className)) {
                status = 'ERROR';
                message = `Class ${className} is already defined`;
                return { status, message, nodes, edges };
            }
            definedClasses.set(className, index++);
            const data ={ className, attributes, methods }
            nodes.push({
                id: className,
                data:{
                    ...data,
                    label: <ClassNode className={className} attributes={attributes} methods={methods} />
                    },
                position: { x: 0, y: 0 },
                width: 200,
                height: 250,
            });
        } else if (sentence.type === 'INHER') {
            const attributes = [];
            const methods = [];
            const childClass = sentence.children[1].value;
            const parentClass = sentence.children[4].value;
            if (definedClasses.has(childClass)) {
                status = 'ERROR';
                message = `Class ${childClass} is already defined`;
                return { status, message, nodes, edges };
            }
            if (!definedClasses.has(parentClass)) {
                status = 'ERROR';
                message = `Parent class ${parentClass} is not defined`;
                break;
            }
            const data ={ childClass, attributes, methods }
            definedClasses.set(childClass, index++);
            nodes.push({
                id: childClass,
                data:{
                    ...data,
                    label: <ClassNode className={childClass} attributes={attributes} methods={methods} />
                    },
                position: { x: 0, y: 0 },
                type: 'input',
                width: 200,
                height: 250,
            });
            edges.push({
                id: `${childClass}-${parentClass}`,
                source: childClass,
                target: parentClass,
                type: 'bezier',
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: '#000000',
                }   
            });
        
        } else if (sentence.type === 'ATR') {
            const className = sentence.children[0].value;
            if (!definedClasses.has(className)) {
                status = 'ERROR';
                message = `Class ${className} is not defined`;
                break;
            }
            const currIndex = definedClasses.get(className);
            
            for (const child of sentence.children[2].children) {
                nodes[currIndex].data.attributes.push(child.value);
            }
        } else if (sentence.type === 'MET') {
            const className = sentence.children[0].value;
            if (!definedClasses.has(className)) {
                status = 'ERROR';
                message = `Class ${className} is not defined`;
                break;
            }
            /// NOT REVIEWED:
            const methodName = sentence.children[2].value;
            const currIndex = definedClasses.get(className);
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
        }
    }
    return { status, message, nodes, edges };
}

/*
a Person is a class.
Person has name, age, height, weight.
Car can drive.
a Student is a Person.
*/
















/*
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