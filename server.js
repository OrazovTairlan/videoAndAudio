const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser")
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload({}));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Сервер запущен на порте: ${port}`));
app.use("/api/auth", require("./routes/api/auth/auth"));
app.use("/api/testDescription", require("./routes/api/testDescription/testDescription"));
app.use("/api/testQuestions", require("./routes/api/testQuestions/testQuestions"));

