const todayInfos = document.querySelectorAll("#top-infos>*")
const todayWeather = document.querySelectorAll("#bottom-infos>*")
const status = document.querySelectorAll('.statuses')
const forecast = document.querySelectorAll('.forecast-boxes')
const locationButton = document.getElementById('locationButton')
const locationList = document.getElementById('locationList')
const locationListClose = document.querySelector('#locationList>span')
const locationListItems = document.querySelectorAll('#locationList > ul > li')
const flip = document.getElementById('flip')
let globalCity = 'karaj'

console.log('lists', locationListItems)
// Get Today
const today = new Date()

// Onload Setting The App
getData('karaj',0)
// Onload Setting The App

async function getData(city,dayIndex) {
    // const post = {
    //     q: 'karaj',
    //     days: 4,
    //
    // }
    const url = `http://api.weatherapi.com/v1/forecast.json?key=814bd351ebfd40b3bfd74620240807&q=${city}&days=4&lang`;
    const options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        // body: JSON.stringify(post),
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        // today infos
        // Get Selected Date from API
        let myDate = new Date(result.forecast.forecastday[dayIndex].date)
        const currentDay = new Intl.DateTimeFormat('en-us', {
            weekday: "long",
        })
        const currentFullDate = new Intl.DateTimeFormat('en-us', {
            month: 'short',
            year: 'numeric',
            day: 'numeric'
        })

        todayInfos[0].innerHTML = currentDay.format(myDate)
        todayInfos[1].innerHTML = currentFullDate.format(myDate)
        todayInfos[2].innerHTML = '<i class="fa-light fa-location-dot text-lg"></i>' + result.location.country + ', ' +result.location.name
        // today infos

        // today weather condition
        // icon
        todayWeather[0].setAttribute('src', result.forecast.forecastday[dayIndex].day.condition.icon)
        // temp
        todayWeather[1].innerHTML = result.forecast.forecastday[dayIndex].day.avgtemp_c + '°C'
        // status
        todayWeather[2].innerHTML = result.forecast.forecastday[dayIndex].day.condition.text
        // today weather condition
        // end mehdi
        // start hamid
        // right box status
        // PRECIPITATION
        status[0].innerHTML = result.forecast.forecastday[dayIndex].day.totalprecip_mm + '%'
        // Humidity
        status[1].innerHTML = result.forecast.forecastday[dayIndex].day.avghumidity + '%'
        // Wind Speed
        status[2].innerHTML = result.forecast.forecastday[dayIndex].day.maxwind_kph + 'km/h'
        // right box status

        // ForeCast Boxes
        forecast.forEach((row,index) => {
            // Condition Icons
            row.children[0].setAttribute('src', result.forecast.forecastday[index].day.condition.icon)

            // Get the days from API
            let thisDate = new Date(result.forecast.forecastday[index].date)
            // Format the Date to the form of weekDay
            let weekDay = new Intl.DateTimeFormat('en-us', {
                weekday: 'short'
            })
            // set the weekday taken from api and Intl.DateTimeFormat
            row.children[1].innerHTML = weekDay.format(thisDate)
            // set the temperature of each day
            row.children[2].innerHTML = result.forecast.forecastday[index].day.avgtemp_c + '°C'
        })
        // ForeCast Boxes

    } catch (error) {
        console.error(error)
    }
}


// todayInfos[0].addEventListener('click', () => {
//    getData("london",0)
// })
// Today Date Setter

// async function getData2() {
//     const url = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=35.7219&lon=51.3347&lang=ir&cnt=4&appid=4d701edf35c2c05c55223116e99aa841'
//     const options = {
//         method: "GET",
//     }
//     try {
//         const res = await fetch(url)
//         const result = await res.json()
//         console.log('get2',result)
//     }catch (err){
//         console.error(err)
//     }
// }


//location pop up
    locationButton.addEventListener('click',()=>{
    locationList.classList.replace('scale-y-0','scale-y-1')
    })
//locationList close
    locationListClose.addEventListener('click',()=>{
        locationList.classList.replace('scale-y-1','scale-y-0')
    })
//location pop up

// Clicks
//foreCast Click
forecast.forEach((row)=> {
    row.addEventListener('click', ()=> {
        // forecast boxes background reset
        forecast.forEach(item => {
            item.style.background = 'transparent'
            item.style.color = 'snow'
        })
        // Clicked forecast box style
        row.style.background = 'snow'
        row.style.color = 'black'

        let dataIndex = row.getAttribute('data-index')
        console.log("GlobalCity:", globalCity)
        getData(globalCity, dataIndex)
    })
})


// location Click
locationListItems.forEach(row => {
    row.addEventListener('click', ()=> {
        let selectedCity = row.getAttribute('data-city')
        globalCity = selectedCity
        getData(globalCity,0)
        locationList.classList.replace('scale-y-1','scale-y-0')
    })
})

// Flip Click
let flipFlag = 0
flip.addEventListener('click', ()=> {
    const divThreeD = flip.nextElementSibling
    if (flipFlag%2 == 0)
        divThreeD.style.transform = 'rotateY(180deg)'
    else
        divThreeD.removeAttribute('style')

    flipFlag++
})
// Clicks