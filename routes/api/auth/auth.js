const express = require('express');
const router = express.Router();
const axios = require("axios");
router.post('/login', async (req, res) => {
    const data = {
        "Login": "77086930773",
        "RoleId": "5d5b8590cc091303c4acfb10",
        "Password": "12345678"
    }
    const result = await axios.post("https://univer.curs.kz/api/authentication/Login", data);
    const token = result.data.token;
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    res.json(token);
});

module.exports = router;
