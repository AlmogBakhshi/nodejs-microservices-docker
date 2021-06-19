const { DB_URI } = require("./src/config");
require("colors");
const mongoose = require("mongoose");
mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(res => console.log(`MongoDB Connected: ${res.connection.host}`.cyan.underline.bold))
    .catch(err => {
        console.error(`Error: ${err}`.red);
        process.exit(1);
    })

require("./src/app").run();