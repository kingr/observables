// dom elements
const appContainer = document.getElementById('app-container');
const zipcodeInput = document.getElementById('zipcode-input');
const addLocationBtn = document.getElementById('add-location');
const test = document.getElementById('test');

const BtnClickStream =
    Rx.Observable
        // create a stream to the matching DOM Element
        .fromEvent(addLocationBtn, 'click');

        // iterate over the observable stream.
        // .subscribe(val => console.log('observable',val));

var fn = function (e) {
    console.log(e.target.value);
}

const zipInputStream =
    Rx.Observable
        .fromEvent(zipcodeInput, 'input')
        .map(e => e.target.value)
        .forEach( val => console.log("obs",val));
        // .filter(zip => zip.length === 4);
//
//
// const zipcodeStream =
//     BtnClickStream
//         .withLatestFrom(zipInputStream, (click, zip) => zip)
//         .distinct()
//
// // Create reusable temperature fetching stream
// const getTemperature = zip =>
//     fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip},za&units=metric&APPID=64a736555dcf29eb04bf4b0410c85ef0`)
//         .then(res => res.json());
//
// const zipTemperatureStreamFactory = zip =>
//     Rx.Observable
//         .fromPromise(getTemperature(zip))
//         .map(({ main: { temp } }) => ({ temp, zip }));
//
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