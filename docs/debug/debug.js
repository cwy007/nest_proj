/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const os = require("os");

const homedir = os.homedir();

console.log('homedir-->', homedir);

// node /Users/chanweiyan/github/nest_proj/docs/debug/debug.js
// node --inspect-brk /Users/chanweiyan/github/nest_proj/docs/debug/debug.js

// --inspect 是调试模式运行，而 --inspect-brk 还会在首行断住。
