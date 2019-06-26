console.log('client side js is loaded')

// fetch('https://puzzle.mead.io/puzzle').then((response)=>[
//     response.json().then((data)=>{
//         console.log(data);
//     })
// ])

const weatherForm = document.querySelector('form')
const searchAddress= document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(searchAddress.value)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''
    fetch('http://localhost:3000/weather-forecast?address=' + searchAddress.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast.summary + ' with '+ data.forecast.forecast + ' temperature'
            }
        })
    })
})
