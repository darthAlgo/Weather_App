const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({encoded: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
    //console.log(req.body.cityName);
    const query = req.body.cityName; //"1260086";
    const apiKey = "3a9929e168cea4f33023ea3da31f56b8";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        //console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            //console.log(temp);
            //console.log(weatherDesc);
            res.write("<p>The weather is currently " + weatherDesc + " </p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius</h1>");
            res.write("<image src=" + imgURL + ">");
            res.send();
        })
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});