import "reflect-metadata";
import app from './app'
import {AppDataSource} from './db'

const PORT = process.env.PORT || 8080;

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected')
        app.listen(PORT,  () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main().then().catch((err) => console.error(err));

