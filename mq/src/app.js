const kafka = require("./config/kafka");

module.exports = async () => {
    try {
        const admin = kafka.admin();
        console.log("Connecting.....");
        await admin.connect();
        console.log("Connected!");
        await admin.createTopics({
            "topics": [{ "topic": "currency-exchange" }]
        });
        console.log("Created Successfully!");
        await admin.disconnect();
    }
    catch (err) {
        console.error(`Error: ${err}`.red);
    }
    finally {
        process.exit(0);
    }
}