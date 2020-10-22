const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3b5174459bcbb0bfd50ea2003be8052c&query=' + latitude + ',' + longitude;
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined,
                // '<img src=' + body.current.weather_icons + '>' +
                body.current.weather_descriptions + ': ' + 'The temperature is: ' + body.current.temperature + '. It feels like the temperature is: ' + body.current.feelslike
            );

            
        }
    });
}

module.exports = forecast;