var URL = 'https://api.openweathermap.org/data/2.5/weather'
var div = document.getElementById('weather-app')
var section = document.getElementById('weather')
var form = document.querySelector('form')
var search = document.getElementById('weather-search')

form.onclick = function(e){
    e.preventDefault()
    userQuery = search.value
    queryString = '?units=imperial&appid=6c837dfcef697002afd6a4d3377a8f81&q=' + userQuery
    fetchURL = URL + queryString
    if (!userQuery) return
    fetch(fetchURL)
    .then(function(res){
        if (res.status !== 200) throw new Error('Location not found')
        return res.json()
    })
    .then(info)
    .catch(function(err){
        var errorMessage = document.createElement('h2')
        errorMessage.innerHTML = err.message
        section.appendChild(errorMessage)
        search.value = ""
    })
};

function info(forecast){
    var location = document.createElement('h2')
    section.innerHTML = ""
    location.textContent = (forecast.name + ',' + forecast.sys.country)
    section.appendChild(location)

    var mapLink = document.createElement('a')
    mapLink.href = ('https://www.google.com/maps/search/?api=1&query=' + forecast.coord.lat + ',' + forecast.coord.lon) 
    mapLink.textContent = 'Click to view map'
    section.appendChild(mapLink).setAttribute('target','_blank')

    var icon = document.createElement('img')
    icon.src = ('https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png')
    icon.alt = forecast.weather[0].description + (' graphic icon')
    section.appendChild(icon)

    var textDescription = document.createElement('p')
    textDescription.textContent = forecast.weather[0].description
    section.appendChild(textDescription).setAttribute('style','text-transform: capitalize;')
    lineBreak = document.createElement('br')
    section.appendChild(lineBreak)

    var current = document.createElement('p')
    current.textContent = ('Current: ' + forecast.main.temp + ' \u2109')
    section.appendChild(current)

    var feelsLike = document.createElement('p')
    feelsLike.textContent = ('Feels like: ' + forecast.main.feels_like + ' \u2109')
    section.appendChild(feelsLike)
    lineBreaks = document.createElement('br')
    section.appendChild(lineBreaks)

    lastUpdated = document.createElement('p')
        var date = new Date(forecast.dt * 1000)
        var timeString = date.toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: '2-digit'
        })
    lastUpdated.textContent = ('Last updated: ' + timeString)
    section.appendChild(lastUpdated)
};