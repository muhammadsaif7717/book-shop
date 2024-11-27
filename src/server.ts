import mongoose from 'mongoose'
import app from "./app"
import config from './app/config';
const PORT = process.env.PORT || 5000;

async function main() {
    try {
        await mongoose.connect(config.database as string);

        app.listen(PORT, () => {
            console.log(`Book shop app is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main();