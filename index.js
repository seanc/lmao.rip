var config = require('rc')('lmao', {
  key: '',
  port: 3000
});
var express = require('express');
var app = express();
var request = require('request');

app.get('/', function(req, res) {
  request(`http://api.giphy.com/v1/gifs/random?api_key=${config.key}&tag=lmao`,
  function(err, resp, body) {
    if (err || resp.statusCode !== 200) {
      return res.send('An error occurred');
    }
    var data = JSON.parse(body);
    var image = data.data.image_url;
    res.send(`
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>lmao.rip</title>
            <script>
              function fixImgSize(img){
                if(window.innerWidth-200<img.naturalWidth||window.innerHeight-100<img.naturalHeight){
                    if(window.innerWidth-200<img.naturalWidth) img.width=window.innerWidth-200;
                    else img.height=window.innerHeight-100;
                }else{
                    img.width=img.naturalWidth;
                }
              }
            </script>
            <style>
              body {
                background-color: #000;
              }
              img {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                margin: auto;
                transform: translateY(-50%);
              }
              .footer {
                position: absolute;
                bottom: 15px;
                color: #fff;
                opacity: 0.4;
                font-size: 12px;
                font-family: 'Arial';
              }
            </style>
          </head>
          <body>
            <img src="${image}" onload="fixImgSize(this);"/>

            <p class="footer">Powered by Giphy</p>
          </body>
        </html>
      `);
  });
});

app.listen(config.port, function() {
  console.log('lmao.rip started');
});
