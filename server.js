const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


const basicAuth = (req, res, next) => {
    return next();
};


app.use(basicAuth);


app.get('/serverAPI/linking', (req, res) => {
    console.log("GET /serverAPI/linking");
    const { license, code } = req.query;

    const mockResponse = {
        success: true,
        message: "Account linked successfully",
    };

    console.log("Received license:", license);
    console.log("Received code:", code);

    res.status(200).json(mockResponse);
});


app.get("/serverAPI/user/identifier", (req, res) => {
    console.log("GET /serverAPI/user/identifier");

    res.json({
        name: "Management",
        priority: 5,
        siteRole: "management",
        _id: Math.random().toString(36).substring(7),
        image: "https://cdn.discordapp.com/avatars/1234567890/abcdefg.jpg",
    });

});

app.get('/data', (req, res) => {
    const data = {
        Restart: false, 
        Uptime: process.uptime(),
        Players: 10, 
        MaxPlayers: 250,
        Queue: 0, 
    };
    res.json(data);
});

app.post('/serverAPI/license', (req, res) => {
    console.log("POST /serverAPI/license");
    const { license } = req.body;
    if (license) {
        const licenseData = {
            status: 'valid',
            license: license,
            owner: 'John Doe',
        };
        res.json(licenseData);
    } else {
        res.status(400).send('License parameter is required.');
    }
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});