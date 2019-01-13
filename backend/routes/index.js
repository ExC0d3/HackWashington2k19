var express = require('express');
const microsofComputerVision = require("microsoft-computer-vision")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.send('OK');
});

router.get('/analyzeImage', function(req, res, next){
  console.log("console");
  var subscriptionKey = "c89b989b989d48f1a0fc5d2533cfbf03";

    var image_url = 'https://wallpaperbrowse.com/media/images/750795.jpg';

    microsofComputerVision.analyzeImage({
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "request-origin":"westus2",
        "content-type": "application/json",
        "url": image_url,
        "visual-features":"Categories,Tags,Description,Faces,ImageType,Color,Adult"
    }).then((result) => {
        console.log(result)
        //res.send(result.description.captions[0].text);
    }).catch((err)=>{
        res.send(err);
        throw err
    })
});


module.exports = router;
