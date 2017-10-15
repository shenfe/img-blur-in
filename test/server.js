const args = process.argv.slice(2);
args.forEach(function (val, index, array) {
    console.log(`${index}: ${val}`);
});

const fs = require('fs');
const path = require('path');
const express = require('express');
const open = require('open');

const port = 8778;

(function () {
    let app = express();
    app.use(express.static('test'));
    app.use(express.static('dist'));
    return app.listen(port);
})();

open(`http://127.0.0.1:${port}/test.html`);
