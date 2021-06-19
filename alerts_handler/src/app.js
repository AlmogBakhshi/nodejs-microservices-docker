const kafka = require("./config/kafka");
const fetch = require("node-fetch");

module.exports = async () => {
    try {
        const consumer = kafka.consumer({ "groupId": "test" })
        console.log("Connecting.....");
        await consumer.connect();
        console.log("Connected!");

        await consumer.subscribe({
            "topic": "currency-exchange"
        });

        await consumer.run({
            "eachMessage": async (res) => {
                console.log(`Alert: ${res.message.value}`.green);
                fetch("https://webhook.site/707ccb81-1118-417d-869d-385b3def4a6f", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: { "alert": JSON.stringify(res.message.value) }
                })
                    .then(res => console.log(res))
                    .catch(err => console.error(`Error: ${err}`.red))
            }
        })
    }
    catch (err) {
        console.error(`Error ${err}`.red);
    }
}