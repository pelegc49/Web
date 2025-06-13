// Tokenizer.jsx
// This file implements a simple lexer (tokenizer) for the custom class diagram language.
// It converts an input string into a list of tokens for the parser to consume.

// List of token specifications: each has a regex and a type.
const tokenSpecs = [
    { regex: /^\n/, type: 'LINE' }, // Newline: used to track line numbers
    { regex: /^[\r\t ]+/, type: null }, // Whitespace: skip
    { regex: /^#.*(\n|$)/, type: null }, // Comments: skip
    { regex: /^(a|an)\b/, type: 'A' }, // Article
    { regex: /^,/, type: 'COMMA' }, // Comma
    { regex: /^\./, type: 'DOT' }, // Dot (end of sentence)
    { regex: /^class\b/, type: 'CLASS' }, // 'class' keyword
    { regex: /^has\b/, type: 'HAS' }, // 'has' keyword
    { regex: /^can\b/, type: 'CAN' }, // 'can' keyword
    { regex: /^(is|are)\b/, type: 'IS' }, // 'is' or 'are' keyword
    { regex: /^related\b/, type: 'RELATED' }, // 'related' keyword
    { regex: /^to\b/, type: 'TO' }, // 'to' keyword
    { regex: /^with\b/, type: 'WITH' }, // 'with' keyword
    { regex: /^(one|many)\b/, type: 'MULT' }, // Multiplicity: 'one' or 'many'
    { regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, type: 'ID' }, // Identifier (class, attribute, method, etc.)
];

// Main lexer function: converts input string to a list of tokens
export function lexer(input) {
    const tokens = [];
    let pos = 0; // Current position in the input string
    let line = 1; // Track line numbers for error reporting
    let status = 'SUCCESS';
    let message = '';
    while (pos < input.length) {
        let match = null;
        let matchedType = null;
        let maxLen = 0;

        // Try each token spec and find the longest match at the current position
        for (const { regex, type } of tokenSpecs) {
            const result = regex.exec(input.slice(pos));
            if (result && result.index === 0 && result[0].length > maxLen) {
                match = result[0];
                matchedType = type;
                maxLen = match.length;
            }
        }

        // If no match, report an error and stop lexing
        if (!match){
            status = 'ERROR';
            message = `Illegal word at line ${line}: "${input.slice(pos).split(/\s/)[0]}"`;
            return {status, message, pos, data: tokens};
        } 
        // If the match is a token type (not whitespace/comment), add it to the token list
        if (matchedType) {
            if (matchedType === 'LINE'){ 
                line++;
            } else {
                tokens.push({ type: matchedType, value: match });
            }
        }

        pos += maxLen; // Move forward in the input string
    }

    return {status,data:tokens};
}

/*
example
input: """
a Person is a class.
Person has name, age, height, weight.
Person can jump with howFar, howHigh.  
Person can speak with sentence.
Person can run.
"""
lexer(input)
output:
{
    status: 'SUCCESS',
    message: 'Lexing completed successfully',
    data: [
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
*/