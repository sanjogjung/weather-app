const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2F2aW4xMjM0IiwiYSI6ImNrdWgzdjdpZTJhOXoydW8zYXN6NDhkMnUifQ.lC2GsFG8PLMb7lIRp5ZMtA&limit=1`
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("can't connect to the mapbox service", undefined)
        }
        else if (body.features.length === 0) {
            console.log(body.features)
            callback("Can't find the location. Try another", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports.geocode = geocode