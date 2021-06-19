const fetch = require("node-fetch");
const CorrencyExchange = require("./models/corrency-exchange_model");

// Create data in db if not exist
module.exports = () => {
    CorrencyExchange.find().then(data => {
        console.log(data);
        data.length === 0 &&
            fetch("https://api.vatcomply.com/rates?base=USD")
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    Object.keys(res.rates).map(async country =>
                        await CorrencyExchange.create({
                            "country": country,
                            "currency": res.rates[country]
                        })
                    );
                })
                .catch(err => console.error(`Error: ${err}`.red))
    })
}