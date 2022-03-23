const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener("submit", (e) => {
    messageOne.classList.remove('error')
    e.preventDefault() // prevent form from rendering page
    const location = search.value
    // console.log(location)
    messageOne.textContent = 'LOADING....'
    messageTwo.textContent=""
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=> {
    response.json().then((data) =>{
        if (data.error) {
            messageOne.textContent= data.error
            messageOne.classList.add('error')
        }
        else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})

})

