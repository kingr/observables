// dom elements
const appContainer = document.getElementById('app-container');
const zipcodeInput = document.getElementById('zipcode-input');
const addLocationBtn = document.getElementById('add-location');
const test = document.getElementById('test');

const BtnClickStream =
    Rx.Observable
        // create a stream to the matching DOM Element
        .fromEvent(addLocationBtn, 'click');

var checkZipCodeSize = function (val, i, arr) {
    if (val.length === 4) {
        return true;
    }
}


const zipInputStream =
    Rx.Observable
        .fromEvent(zipcodeInput, 'input')
        .map(e => e.target.value);
        // .filter(checkZipCodeSize);

const zipcodeStream =
    BtnClickStream
        .withLatestFrom(zipInputStream, (click, zip) => zip)
        .distinct();

const getTemperature = zip =>
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${zip}&units=metric&APPID=64a736555dcf29eb04bf4b0410c85ef0`)
        .then(res => res.json());


const zipTemperatureStreamFactory = zip =>
    Rx.Observable
        .fromPromise(getTemperature(zip))
        .map((val) => {
            console.log(val)
            var weatherObj = {temp: val.main.temp, zip: parseInt(zip), city: val.name};
            return weatherObj;
        });

zipcodeStream
    .flatMap(zipTemperatureStreamFactory)
    .forEach(({temp, zip, city}) => {
            const weatherWidget = document.createElement('div');
            weatherWidget.id = `zip-${zip}`;
            weatherWidget.classList.add('location');

            const zipEle = document.createElement('p');
            zipEle.classList.add('zip');
            zipEle.innerText = city;

            const tempEle = document.createElement('p');
                tempEle.classList.add('temp');
                tempEle.innerHTML = `${temp}&deg;C`;

            weatherWidget.appendChild(zipEle);
            weatherWidget.appendChild(tempEle);
            appContainer.appendChild(weatherWidget);
    });

// zipcodeStream
//     .flatMap(zipTemperatureStreamFactory)
//     .forEach(({ zip, temp }) => {
//         const locationEle = document.createElement('div');
//         locationEle.id = `zip-${zip}`;
//         locationEle.classList.add('location');
//
//         const zipEle = document.createElement('p');
//         zipEle.classList.add('zip');
//         zipEle.innerText = zip;
//
//         const tempEle = document.createElement('p');
//         tempEle.classList.add('temp');
//         tempEle.innerHTML = `${temp}&deg;C`;
//
//         locationEle.appendChild(zipEle);
//         locationEle.appendChild(tempEle);
//         appContainer.appendChild(locationEle);
//
//         zipcodeInput.value = '';
//     });