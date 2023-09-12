const mongoose = require('mongoose');

async function connectMongoDB(url)
{
    return mongoose.connect(url);
}

module.exports = {connectMongoDB};      //export in order to destructure it 