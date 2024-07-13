// `http://api.weatherapi.com/v1/forecast.json?key=814bd351ebfd40b3bfd74620240807&q=${city}&days=4&lang`
const todayInfos = document.querySelectorAll("#top-infos>*")
const todayWeather = document.querySelectorAll("#bottom-infos>*")
getData('karaj',0)
// function getData(){
//     const URL = `http://api.weatherapi.com/v1/forecast.json?key=814bd351ebfd40b3bfd74620240807&q=karaj&days=7`
//     const option = {
//         method :'GET',
//         headers: {'content-type': 'application/json'},
//         //body
//     }
//     fetch(URL,option)
//         .then(response =>{
//             if(response.ok) return response.json()
//             return Promise.reject(err)
//         })
//         .then(result =>{
//
//             console.log(result)
//         })
//         .catch(error=> console.log(err))
// }

async function getData(city,dayIndex){
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=814bd351ebfd40b3bfd74620240807&q=new_york&days=4`
    const option = {
        method :'GET',
        headers: {'content-type': 'application/json'},
        //body
    }
    try{
        const response = await fetch(URL,option)
        const result = await response.json()
        console.log(result)
        //today info api
        let myDate = new Date(result.forecast.forecastday[dayIndex].date)
        const currentDay = new Intl.DateTimeFormat('en-us',{
            weekday :'long',
        })
        const currentFullDate = new Intl.DateTimeFormat('en-us',{
            month :'short',
            year:'numeric',
            day:'numeric'
        })
        // top infos
        // weekday
        todayInfos[0].innerHTML = currentDay.format(myDate)
        //full date
        todayInfos[1].innerHTML = currentFullDate.format(myDate)
        //location
        todayInfos[2].innerHTML = '<i class="fa-light fa-location-dot text-lg"></i>' + result.location.name+ ' , '+ result.location.country

        // todayInfos
        //bottom infos (status)
        // condition icon
        todayWeather[0].setAttribute('src',result.forecast.forecastday[dayIndex].day.condition.icon)
        // today's temp
        todayWeather[1].innerHTML = result.forecast.forecastday[dayIndex].day.avgtemp_c
        // today's condition text
        todayWeather[2].innerHTML = result.forecast.forecastday[dayIndex].day.condition.text



    }catch(err){
        console.log(err)
    }
}
