const tokenSpecs = [
    { regex: /^[\r\t\n ]+/, type: null }, // skip whitespace
    { regex: /^#.*(\n|$)/, type: null }, // skip comments
    { regex: /^(a|an)\b/, type: 'A' },
    { regex: /^,/, type: 'COMMA' },
    { regex: /^\./, type: 'DOT' },
    { regex: /^class\b/, type: 'CLASS' },
    { regex: /^has\b/, type: 'HAS' },
    { regex: /^can\b/, type: 'CAN' },
    { regex: /^is\b/, type: 'IS' },
    { regex: /^related\b/, type: 'RELATED' },
    { regex: /^to\b/, type: 'TO' },
    { regex: /^with\b/, type: 'WITH' },
    { regex: /^(one|many)\b/, type: 'MULT' },
    { regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, type: 'ID' },

];

export function lexer(input) {
    const tokens = [];
    let pos = 0;

    while (pos < input.length) {
        let match = null;
        let matchedType = null;
        let maxLen = 0;

        for (const { regex, type } of tokenSpecs) {
            const result = regex.exec(input.slice(pos));
            if (result && result.index === 0 && result[0].length > maxLen) {
                match = result[0];
                matchedType = type;
                maxLen = match.length;
            }
        }

        if (!match) break; // No match found, stop lexing

        if (matchedType) {
            tokens.push({ type: matchedType, value: match });
        }
        pos += maxLen;
    }

    return tokens;
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
*/