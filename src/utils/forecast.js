const request = require('request')

//forecasting using darksky.net
const forecast = (lat, lon, callback) => {

    const url = 'https://api.darksky.net/forecast/d8163d9f5eda42350f6db4704832e699/' + lat + ',' + lon//+ '?units=si&lang=es'
    
    // request({ url: url, json: true }, (error, response) => {
    //     if (error) {
    //         callback('unable to connect to location services', undefined);
    //     }
    //     else if (response.body.error) {
    //         callback('unable to find location', undefined)
    //     }
    //     else {
    //         data = response.body.daily.data[0]
    //         callback(undefined, {
    //             summary: data.summary,
    //             forecast: data.temperatureLow,
    //         })
    //     }
    // });
    
    //using shorthand and destructuring
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services', undefined);
        }
        else if (body.error) {
            callback('unable to find location', undefined)
        }
        else {
            data = body.daily.data[0]
            callback(undefined, {
                summary: data.summary,
                forecast: data.temperatureLow,
            })
        }
    });
}

module.exports = forecast;