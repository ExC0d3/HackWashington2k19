var express = require('express');
const microsofComputerVision = require("microsoft-computer-vision")
var router = express.Router();
const fs = require('fs');
const path = require('path');
/* GET home page. */
router.get('/',function(req, res, next) {
    
    res.send('OK');
});

router.post('/analyzeImage', function(req, res, next){
  console.log("console");
  
  var subscriptionKey = "c89b989b989d48f1a0fc5d2533cfbf03";

    var image_url = 'https://wallpaperbrowse.com/media/images/750795.jpg';
    
    console.log('File:', req.file);
    try{
        const data = fs.readFileSync(path.resolve('../','backend','uploads','image.png'));
    }
    catch(e){
        console.log('Error: ',e);
    }
    
    
    microsofComputerVision.analyzeImage({
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "request-origin":"westus2",
        "content-type": "application/octet-stream",
        "body":req.file.buffer,
        "visual-features":"Categories,Tags,Description,Faces,ImageType,Color,Adult"
    })
    .then((data) => {
        console.log(data);
        res.send(data)
    })
    .catch((err) => {
        throw err;
    })
});


module.exports = router;
