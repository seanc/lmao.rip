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
            function fixImgSize(img) {
                var imgNRatio = img.naturalWidth / img.naturalHeight;
                var desiredWidth = window.innerWidth * 0.8;
                var desiredHeight = window.innerHeight * 0.8;
                if (desiredWidth / desiredHeight > imgNRatio) {
                    delete img.width;
                    img.height = desiredHeight;
                } else if (desiredWidth / desiredHeight < imgNRatio) {
                    delete img.height;
                    img.width = desiredWidth;
                } else {
                    img.width = desiredWidth;
                    img.height = desiredHeight;
                }
            }
            document.addEventListener('DOMContentLoaded', function() {
              var image = document.querySelector('#meme');
              fixImgSize(image);
            });
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
            <img src="${image}" id="meme"/>

            <p class="footer">Powered by Giphy</p>
          </body>
        </html>
      `);
  });
});

app.listen(config.port, function() {
  console.log('lmao.rip started');
});
