// Parser.jsx
// This file implements a hand-written recursive descent parser for the custom class diagram language.
// It takes a list of tokens and produces a parse tree (AST) representing class definitions, attributes, methods, inheritance, and relationships.
// The parser also provides detailed error messages for invalid or incomplete input.

// Grammar rules for the supported language constructs.
const prodRules = {
    'START': ['SENT START','SENT'], // A program is a sequence of sentences
    'SENT': ['DEF DOT','ATR DOT','MET DOT','INHER DOT','REL DOT'], // Each sentence ends with a dot
    'DEF':['A ID IS A CLASS'], // Class definition
    'LIST': ['ID COMMA LIST','ID'], // List of identifiers (attributes, params)
    'ATR': ['ID HAS LIST'], // Attribute definition
    'MET': ['ID CAN ID WITH LIST','ID CAN ID'], // Method definition (with/without params)
    'INHER':['A ID IS A ID'], // Inheritance
    'REL':['MULT ID IS RELATED TO MULT ID'], // Relationship
}

// Main parse function: entry point for parsing a list of tokens into an AST
export function parse(tokens) {
    let pos = 0; // Current position in the token list
    let status = 'SUCCESS'; // Parsing status
    let message = ''; // Error message if parsing fails

    // Look at the next token without consuming it
    function peek() {
        return tokens[pos];
    }

    // Match and consume a token of the expected type, or throw an error with a helpful message
    function match(expectedType) {
        if (peek() && peek().type === expectedType) {
            return tokens[pos++];
        }
        status = 'ERROR';
        if (!peek()) {
            message = `Your sentence is incomplete. Please finish writing it and end with a dot.`;
        } else {
            const expected = expectedType.toLowerCase();
            const got = peek().type.toLowerCase();
            const value = peek().value;
            
            switch (expectedType) {
                case 'DOT':
                    message = `Missing dot at the end of the sentence. Each sentence must end with a dot.`;
                    break;
                case 'ID':
                    message = `Expected a name or identifier, but found '${value}' instead.`;
                    break;
                case 'IS':
                    message = `Expected the word 'is', but found '${value}' instead.`;
                    break;
                case 'HAS':
                    message = `Expected the word 'has', but found '${value}' instead.`;
                    break;
                case 'CAN':
                    message = `Expected the word 'can', but found '${value}' instead.`;
                    break;
                case 'CLASS':
                    message = `Expected the word 'class', but found '${value}' instead.`;
                    break;
                case 'WITH':
                    message = `Expected the word 'with' after the method name, but found '${value}' instead.`;
                    break;
                case 'RELATED':
                    message = `Expected the word 'related' in relationship definition, but found '${value}' instead.`;
                    break;
                case 'TO':
                    message = `Expected the word 'to' in relationship definition, but found '${value}' instead.`;
                    break;
                case 'MULT':
                    message = `Expected a multiplicity indicator (one/many), but found '${value}' instead.`;
                    break;
                case 'A':
                    message = `Expected the word 'a', but found '${value}' instead.`;
                    break;
                case 'COMMA':
                    message = `Expected a comma between items in the list, but found '${value}' instead.`;
                    break;
                default:
                    message = `Expected ${expected}, but found '${value}' instead.`;
            }
        }
        throw new Error(message);
    }

    // Try to match and consume a token of the expected type, or return null if not found
    function tryMatch(expectedType) {
        if (peek() && peek().type === expectedType) {
            return tokens[pos++];
        }
        return null;
    }

    // Parse the root of the program: a sequence of sentences
    function parseSTART() {
        const children = [];
        while (pos < tokens.length) {
            children.push(parseSENT());
        }
        return { type: "START", children };
    }

    // Parse a single sentence, dispatching to the correct rule based on the lookahead token
    function parseSENT() {
        const lookahead = peek();
        let node;
        if (lookahead?.type === "A") {
            // Could be a class definition or inheritance
            if (tokens[pos + 4]?.type === "CLASS") {
                node = parseDEF();
            } else {
                node = parseINHER();
            }
        } else if (lookahead?.type === "ID") {
            // Could be attribute or method definition
            if (tokens[pos + 1]?.type === "HAS") {
                node = parseATR();
            } else if (tokens[pos + 1]?.type === "CAN") {
                node = parseMET();
            } else {
                status = 'ERROR';
                if (tokens[pos + 1]){
                message = `Unexpected word after ${lookahead?.value}: found '${tokens[pos + 1]?.value}' expected 'has' or 'can'`;
                }else{
                message = `Expected 'has' or 'can' after ${lookahead?.value}`;
            }
                throw new Error(message);
            }
        } else if (lookahead?.type === "MULT") {
            // Relationship sentence
            node = parseREL();
        } else {
            status = 'ERROR';
            if (!lookahead) {
                message = `Empty sentence found. Each sentence should start with either 'a' for definitions/inheritance, a name followed by 'has'/'can', or 'one'/'many' for relationships.`;
            } else {
                message = `Invalid sentence start: '${lookahead.value}'. A sentence should start with either 'a' for definitions/inheritance, a name followed by 'has'/'can', or 'one'/'many' for relationships.`;
            }
            throw new Error(message);
        }
        node.children.push(match("DOT")); // Every sentence must end with a dot
        return node;
    }

    // Parse a class definition sentence
    function parseDEF() {
        return {
            type: "DEF",
            children: [
                match("A"),
                match("ID"),
                match("IS"),
                match("A"),
                match("CLASS")
            ]
        };
    }

    // Parse an attribute definition sentence
    function parseATR() {
        return {
            type: "ATR",
            children: [
                match("ID"),
                match("HAS"),
                parseLIST()
            ]
        };
    }

    // Parse a method definition sentence (with or without parameters)
    function parseMET() {
        const children = [
            match("ID"),
            match("CAN"),
            match("ID")
        ];
        const third = peek();
        if (third?.type === "WITH") {;
            children.push(match("WITH"));
            children.push(parseLIST());
        }
        return { type: "MET", children };
    }

    // Parse an inheritance sentence
    function parseINHER() {
        return {
            type: "INHER",
            children: [
                match("A"),
                match("ID"),
                match("IS"),
                match("A"),
                match("ID")
            ]
        };
    }

    // Parse a relationship sentence
    function parseREL() {
        return {
            type: "REL",
            children: [
                match("MULT"),
                match("ID"),
                match("IS"),
                match("RELATED"),
                match("TO"),
                match("MULT"),
                match("ID")
            ]
        };
    }

    // Parse a comma-separated list of identifiers
    function parseLIST() {
        const children = [match("ID")];
        while (tryMatch("COMMA")) {
            children.push(match("ID"));
        }
        return { type: "LIST", children };
    }

    // Try to parse the input and return the AST, or return error info if parsing fails
    try{
        return {status,message,data:parseSTART()};
    } catch(e){
        return {status,message,pos,data:null};
    }
}



/* Example usage
input: 
[
	{"type": "A", "value": "a"},
	{"type": "ID", "value": "Person"},
	{"type": "IS", "value": "is"},
	{"type": "A", "value": "a"},
	{"type": "CLASS", "value": "class"},
	{"type": "DOT", "value": "."},
	{"type": "ID", "value": "Person"},
	{"type": "HAS", "value": "has"},
	{"type": "ID", "value": "name"},
	{"type": "COMMA", "value": ","},
	{"type": "ID", "value": "age"},
	{"type": "COMMA", "value": ","},
	{"type": "ID", "value": "height"},
	{"type": "COMMA", "value": ","},
	{"type": "ID", "value": "weight"},
	{"type": "DOT", "value": "."},
	{"type": "ID", "value": "Person"},
	{"type": "CAN", "value": "can"},
	{"type": "ID", "value": "jump"},
	{"type": "WITH", "value": "with"},
	{"type": "ID", "value": "howFar"},
	{"type": "COMMA", "value": ","},
	{"type": "ID", "value": "howHigh"},
	{"type": "DOT", "value": "."},
	{"type": "ID", "value": "Person"},
	{"type": "CAN", "value": "can"},
	{"type": "ID", "value": "speak"},
	{"type": "WITH", "value": "with"},
	{"type": "ID", "value": "sentence"},
	{"type": "DOT", "value": "."},
	{"type": "ID", "value": "Person"},
	{"type": "CAN", "value": "can"},
	{"type": "ID", "value": "run"},
	{"type": "DOT", "value": "."}
]

output:
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
        {
            "type": "LIST",
            "children": [
                { "type": "ID", "value": "run" }
            ]
        },
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
*/