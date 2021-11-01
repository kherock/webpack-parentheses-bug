const a = new (require('url').URL)('file:' + __filename).href
const b = new (require('url')).URL('file:' + __filename).href
console.log(a, b);
