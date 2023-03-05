const express =require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/res",function(req,res){

    res.sendFile(__dirname + "/index.html");
});
app.post("/res",function(req,res){
 
    const appid = "1eccafd8f7c4a13bd515517d4e0032c5" ;
  const unit = "metric";
  const city = req.body.cityname;

//   const city ="Malappuram";
    const url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+unit;
     
    http.get( url , function (response){
      
        console.log(response.statusCode);

        response.on("data",function(data){
          
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
             const feeling = WeatherData.weather[0].description;
             const location =WeatherData.name;
             const icon = WeatherData.weather[0].icon;
          
             const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
          
             res.write("<h1>temperature is "+ temp +" degree celcius in "+location+"</h1>");
          res.write("<p>the weather is "+feeling+"</p>");
          res.write("<img src="+ imageurl+" >");
         
          res.send();

        });

    });
    
});
// app.set('port', process.env.PORT || 8080);
app.listen(3000,function(){

    console.log("server running");

});