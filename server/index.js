require('dotenv').config();

require("./db/connection");

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: "https://demo-y-classes.vercel.app"
  })
);

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
    console.log("Server listening on port -", PORT);
});

const register = require("./routes/register");
app.use("/register", register);

const check = require("./routes/check");
app.use("/check", check);

const update = require("./routes/update");
app.use("/update", update);