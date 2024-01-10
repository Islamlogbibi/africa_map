document.addEventListener('DOMContentLoaded', (event) => {
    const countries = document.querySelectorAll('.mapdiv path');
    const infoDiv = document.getElementById('country-info');

    const requestOptions = {
        headers: new Headers({
            "X-CSCAPI-KEY": "OVNFMTFNQnlaNGdwZHE2bjZWbmp6TlA0czlUVmFGMmlnNlhxR1NwTQ=="
        }),
    };

    countries.forEach(country => {
        country.addEventListener('click', function() {
            const selectedCountry = document.querySelector('.mapdiv path.selected');
            if (selectedCountry) {
                selectedCountry.classList.remove('selected');
            }
            this.classList.add('selected');
            const countryCode = this.getAttribute('data-id');

            fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    infoDiv.style.display = 'block';
                    infoDiv.innerHTML = `
                        <h2>${data.name}</h2>
                        <p><b>Capital:</b> ${data.capital}</p>
                        <p><b>Currency:</b> ${data.currency}</p>
                        <p><b>Phonecode:</b> ${data.phonecode}</p>
                    `;
                })
                .catch(error => console.error(error));
        });
    });
});
