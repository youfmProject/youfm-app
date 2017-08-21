var _ = require('lodash');

var t = 'value';

var w = {
    s: {
        value: true
    }
};

console.log(_.get(w, 's[t]'));