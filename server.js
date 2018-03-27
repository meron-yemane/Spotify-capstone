'use strict'; 

const express = require('express');
const app = express();

app.use(express.static('public'));
//app.use('/genre/', )

app.listen(process.env.PORT || 8080, () => console.log("listening"));

module.exports = app;