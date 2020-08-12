/* Global Variables */
const zipInput = document.querySelector('.zip');
const feelingInput = document.querySelector('.feeling');
const generator = document.querySelector('.generate');
const date = document.querySelector('#date span');
const temp = document.querySelector('#temp span');
const content = document.querySelector('#content span');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '6e4bf6b28b0e229061de14ce05cf7936';

// Event listener to add function to existing HTML DOM element
generator.addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    let zipValue = zipInput.value;
    let feelingValue = feelingInput.value;


    getWeatherData(baseURL, zipValue, apiKey)
    .then(data => {
        console.log(data);
        postData('/addWeatherData', {date: newDate, 'temp': data['main']['temp'], 'content': feelingValue});

        updateUI();
        })
}

/* Function to GET Web API Data*/
const getWeatherData = async(baseurl, zip, apikey) => {
    const res = await fetch(`${baseurl}${zip}&APPID=${apikey}&units=metric`);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */

const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}


/* Function to GET Project Data */
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        allData = await request.json();
        console.log(allData);
        date.innerHTML = allData.date;
        temp.innerHTML = allData.temp + '°C';
        // temp.innerHTML = Math.round(parseFloat(allData.temp)-273.15) + 'degree';
        content.innerHTML = allData.content;
    } catch (error) {
        console.log('error', error)
    }
}