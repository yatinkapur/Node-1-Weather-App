const request = require('request')

//geocoding using mapbox.com
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FwdXJ5YXRpbjAyIiwiYSI6ImNqdzh2NTliMDBhdmQ0OXJ0bDZxbmVuMzAifQ.tBZAG-HvylTSgtEQ-mnWrQ'

    // request ({url: url, json: true}, (error, response)=>{
    //     if(error){
    //         callback('unable to connect to location services', undefined)
    //     }
    //     else if(response.body.features.length === 0){
    //        callback('unable to find location. Try another search', undefined)
    //     }
    //     else{
    //         callback(undefined, {
    //            location:  response.body.features[0].place_name,
    //            latitude:  response.body.features[0].center[0],
    //            longitude: response.body.features[0].center[1]
    //         })
    //     }
        
    // });

    request ({url, json: true}, (error, {body})=>{
        if(error){
            callback('unable to connect to location services', undefined)
        }
        else if(body.features.length === 0){
           callback('unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined, {
               location:  body.features[0].place_name,
               latitude:  body.features[0].center[0],
               longitude: body.features[0].center[1]
            })
        } 
    });
}

module.exports = geocode;