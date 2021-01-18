const fetch = require("node-fetch");

const query = async () => {
    let d;
    const url = "https://api.postcodes.io/postcodes/N79RA";
    await fetch(url)
    .then(reponse => reponse.json())
    .then(data => console.log(data.result.postcode))

}

query();