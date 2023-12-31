const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());

app.use(require("./router/branch"));
app.use(require("./router/room"));
app.use(require("./router/owner"));

const dbo = require("./conn");

app.listen(port, () => {   
    dbo.connectToServer(function (err) {
        if (err)
            console.log(err);
    });
    console.log("Server is running");  
})

