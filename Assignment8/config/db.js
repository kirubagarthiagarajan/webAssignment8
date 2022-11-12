const mongoose = require('mongoose');
const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Databse connected`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDatabase;