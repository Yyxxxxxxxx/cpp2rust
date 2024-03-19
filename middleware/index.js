const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const process = require("child_process");
const app = express()
app.use(bodyParser());



app.post('/translate', function (req, res) {
  const code = req.body.code;
  fs.writeFile('./temp.cpp', code, err => {
    if (err) {
      console.error(err);
    }
  });
  process.exec('./C2RustGLM ./temp.cpp ', (err, stdout, stderr) => {
    var str = stdout;
    if (str == 'error') {
      res.send(str);
    } else {
      str = str.slice(7);
      str = str.slice(0, -4);
      res.send(str.trim());
    }
  })
})

app.listen(3000);