const search = document.getElementById('search-button');

addressDiv = document.getElementById('address');
forecastDiv = document.getElementById('forecast');

search.addEventListener('click', (e) => {
    e.preventDefault();
    const address = document.getElementById('address-bar').value;
    if (address) {
        console.log(address);
        fetch(`/weather?address=${address}`).then(response => {
            response.json().then(({location, region, country, weather, temperature}) => {
                addressDiv.innerHTML = `${location}, ${region}, ${country}`;
                forecastDiv.innerHTML = `${weather}, ${temperature}° C`;
            }).catch(error => {
                addressDiv.innerHTML = error.error;
            });
        })
    } else {
        addressDiv.innerHTML = 'Provide address';
    }
});
