// import Handlebars from 'handlebars';
import Logger from './debug-log';
const Handlebars = require('handlebars');

Handlebars.registerHelper('iff', (a: string, operator: string, b: string, opts: { fn: any, inverse: any }) => {
    Logger.dev(`iff ${a} ${operator} ${b} `,opts);

    var bool = false;
    switch(operator) {
       case '==':
           bool = a == b;
           break;
       case '>':
           bool = a > b;
           break;
       case '<':
           bool = a < b;
           break;
       default:
           throw "Unknown operator " + operator;
    }
 
    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});