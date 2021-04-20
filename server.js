const  { promisify } = require('util');
const express = require('express');
const redis = require('redis');

const client = redis.createClient();

const rIncr = promisify(client.incr).bind(client);

async function init() {
    const app = express();
    app.get('/pageViews', async (req, res) => {
        const views = await rIncr('pageViews');
        res.json({ status: 'ok', views});
    });

    const PORT = 3000;
    app.use(express.static('./static'));
    app.listen(PORT);
    console.log(`running on the port http://localhost:${PORT}`);
}

init();
