import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect(config.db_uri as string);

        app.listen(config.port, () => {
            console.log(`App listening on port ${config.port}`)
        })
    } catch (error) {
        console.error(error)
    }
}
