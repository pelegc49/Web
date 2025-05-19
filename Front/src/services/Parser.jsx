// Grammar rules
const prodRules = {
    'START': ['SENT START','SENT'],
    'SENT': ['DEF DOT','ATR DOT','MET DOT','INHER DOT','REL DOT'],
    'DEF':['A ID IS A CLASS'],
    'LIST': ['ID COMMA LIST','ID'],
    'ATR': ['ID HAS LIST'],
    'MET': ['ID CAN ID WITH LIST','ID CAN ID'],
    'INHER':['A ID IS A ID'],
    'REL':['MULT ID IS RELATED TO MULT ID'],
}

export function parse(tokens) {
    let pos = 0;
    let status = 'SUCCESS';
    let message = '';
    function peek() {
        return tokens[pos];
    }

    function match(expectedType) {
        if (peek() && peek().type === expectedType) {
            return tokens[pos++];
        }
        status = 'ERROR';
        message = `Expected ${expectedType}, got ${peek()?.type || 'EOF'}`;
        throw new Error(message);
    }

    function tryMatch(expectedType) {
        if (peek() && peek().type === expectedType) {
            return tokens[pos++];
        }
        return null;
    }

    function parseSTART() {
        const children = [];
        while (pos < tokens.length) {
            children.push(parseSENT());
        }
        return { type: "START", children };
    }

    function parseSENT() {
        const lookahead = peek();
        let node;
        if (lookahead?.type === "A") {
            if (tokens[pos + 4]?.type === "CLASS") {
                node = parseDEF();
            } else {
                node = parseINHER();
            }
        } else if (lookahead?.type === "ID") {
            if (tokens[pos + 1]?.type === "HAS") {
                node = parseATR();
            } else if (tokens[pos + 1]?.type === "CAN") {
                node = parseMET();
            } else {
                status = 'ERROR';
                message = `Invalid SENT at token: ${JSON.stringify(lookahead)}`;
                throw new Error(message);
            }
        } else if (lookahead?.type === "MULT") {
            node = parseREL();
        } else {
            status = 'ERROR';
            message = `Invalid SENT at token: ${JSON.stringify(lookahead)}`;
            throw new Error(message);
        }
        node.children.push(match("DOT"));
        return node;
    }

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

    function parseLIST() {
        const children = [match("ID")];
        while (tryMatch("COMMA")) {
            children.push(match("ID"));
        }
        return { type: "LIST", children };
    }
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
    }
]
}
*/