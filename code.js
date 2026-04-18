const axios=require("axios")

var data=axios("https://api.openweathermap.org/data/2.5/weather?q=london&appid=d3cb8e0f6af7be5ce266667bb0f971b5")

data.then(function(userdata)
{
    console.log(userdata.data.weather[0].main)
}).catch(function(errmsg)
{
    console.log("Couldnt get results")
})