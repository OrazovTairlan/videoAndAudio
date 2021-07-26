const express = require('express');
const router = express.Router();
const axios = require("axios");
router.get('/testQuestions', async (req, res) => {
    const data = {
        "Login": "77086930773",
        "RoleId": "5d5b8590cc091303c4acfb10",
        "Password": "12345678"
    };
    console.log(req.headers);
    const result = await axios.get("https://dashboard.curs.kz:8023/api/Tests/Details/?id=120521", {
        headers: {
            "Authorization": req.headers["authorization"]
        }
    }).catch(e => console.log(e.message, "error"));
    console.log(result, "result");
    const description = result.data;
    res.json(description);
});

module.exports = router;
