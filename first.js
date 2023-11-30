 
let locationPermission=document.getElementById("grantacess")
let yourWeather=document.querySelector("[data-yourweather]")
let searchWeather=document.querySelector("[data-searchWeather]")
let userContainer=document.getElementsByClassName("weather-information")
let grantlocation=document.querySelector("[data-grantlocationcon]")
let searchForm=document.querySelector("[data-searchForm]")
let dataLoading=document.querySelector("[data-loadingContain]")
let userCon=document.querySelector("[data-userinfocontainer]")
let countryName=document.getElementById('countryName')
let weatherDescription=document.querySelector('[data-weatherdes]')
let weatherImg=document.querySelector("[data-weatherimg]")
let twe=document.querySelector("[data-temper]");
let  windTitle=document.querySelector("[data-windspeedtitle]");
let  windspeedNumber=document.querySelector("[data-speedNumber]");
let  humidTitle=document.querySelector("[data-humidTitle]")
let  humidNumber=document.querySelector("[data-humidNumber]")
let cloudTitle=document.querySelector("[data-cloudtitle]")
let cloudNumber=document.querySelector("[data-cloudNumber]")
let Flag=document.querySelector("[data-countryFlag]")
let btnSearch=document.getElementById("btnSearch")



let userTab=yourWeather;
let curentTab=userTab
let apiKey="88257fb3f5c2dc05bd500090366996c1";
getSessionStorage()


curentTab.classList.add('current-tab')

yourWeather.addEventListener('click',()=>{

         switchtab(yourWeather)




})
searchWeather.addEventListener('click',()=>{

              
        switchtab(searchWeather)
 

})

function switchtab(clickedTab)
{
 
     if(curentTab!=clickedTab)
     {

             curentTab.classList.remove('current-tab')
              
             curentTab=clickedTab;
             curentTab.classList.add('current-tab')

             if(!searchForm.classList.contains('active'))
             {

                     grantlocation.classList.remove('active');
                     userCon.classList.remove('active');
                     searchForm.classList.add('active');

             }
             else
             {

          
                   searchForm.classList.remove('active')
                   userCon.classList.remove('active')
                    
                   getSessionStorage()
                 
          
          
             



             }

             

     }
    


}

function getSessionStorage()
{


      let cord=sessionStorage.getItem('cor');
      let cords=sessionStorage.getItem('corr')


      if(!cord)
      {
         
           grantlocation.classList.add('active')

      }
      else{

            let  lati=cord;
            let longi=cords

            featchWeather(lati,longi)



      }
      



}
async function featchWeather(lati,longi){

       let latit=lati;
       let longii=longi

       grantlocation.classList.remove('active');

       dataLoading.classList.add('active')
 
  try{
     let weain=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${longii}&appid=88257fb3f5c2dc05bd500090366996c1`)

     let result=await weain.json();

     dataLoading.classList.remove('active')

      userCon.classList.add('active')

      renderWeather(result)

  }
  catch(e)
  {

  }





}
function renderWeather(data)
{

    countryName.innerHTML=data?.name
    Flag.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weatherDescription.innerHTML=data?.weather?.[0]?.description
    weatherImg.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`
    let ter=data?.main?.temp
    let we=ter-273.15
    let wer=we.toFixed(2)
    twe.innerHTML=`${wer}°`
    windspeedNumber.innerHTML=data?.wind?.speed
    humidNumber.innerHTML=data?.main?.humidity
    cloudNumber.innerHTML=data?.clouds?.all








}
grantlocation.addEventListener('click',getCordinates)

function getCordinates()
{

     if(navigator.geolocation)
     {
              navigator.geolocation.getCurrentPosition((values)=>{

                    
                  lat=values.coords.latitude;
                  lon=values.coords.longitude

                  console.log(lat)
                  console.log(lon)

                 sessionStorage.setItem('cor',lat)
                 sessionStorage.setItem('corr',lon)

                 featchWeather(lat,lon)

              })

     }






}

searchForm.addEventListener('submit',(f)=>{

       f.preventDefault();
   let cityna=document.getElementById("inputCity").value;
   console.log(cityna)

   console.log("hello")

   if(cityna=="")
   {
     return
   }

   else{
 
   featchWeatherCity(cityna)
   }


})

async function featchWeatherCity(cityo){

     dataLoading.classList.add('active')
     userCon.classList.remove('active')
     grantlocation.classList.remove('active')

      try{

      let info=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityo}&appid=88257fb3f5c2dc05bd500090366996c1`)
      let re=await info.json()
      dataLoading.classList.remove('active')

      userCon.classList.add('active')

        renderWeather(re)


      }
      catch(e)
      {
               console.log("hello man")
      }



}



