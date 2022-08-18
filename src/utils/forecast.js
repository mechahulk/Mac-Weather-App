const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fdf483686528e2fb24814b7e193fbf72&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const curDate = new Date(body.location.localtime)
            console.log(curDate.getMonth(), curDate.getDate(), curDate.getFullYear())
            callback(undefined, 'Local date and time is ' + body.location.localtime + '. ' +
                body.current.weather_descriptions[0] + ' and currently at ' + body.current.temperature + '°c, it also feels like ' + body.current.feelslike + '°c.')
        }
    })
}

module.exports = forecast