import {lexer} from './Tokenizer.jsx';

const prodRules = {
    'START': ['SENT START','SENT'],
    'SENT': ['DEF <DOT>','ATR <DOT>','MET <DOT>','INHER <DOT>','REL <DOT>'],
    'DEF':['<A> <ID> <IS> <A> <CLASS>'],
    'LIST': ['<ID> <COMMA> LIST','<ID>'],
    'ATR': ['<ID> <HAS> LIST'],
    'MET': ['<ID> <CAN> <ID> <WITH> LIST','<ID> <CAN> <ID>'],
    'INHER':['<A> <ID> <IS> <A> <ID>'],
    'REL':['<MULT> <ID> <IS> <RELATED> <TO> <MULT> <ID>'],
}

