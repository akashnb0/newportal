const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: '10mb' }));

// Enable CORS for all routes (including preflight requests)
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.use('/', Routes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started at port no. ${PORT}`);
});
