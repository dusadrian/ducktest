// import * as fs from 'fs';
import * as path from 'path';
import * as DuckDB from 'duckdb';
import * as interfaces from "../libraries/interfaces";


let dbFile = '';

if (process.env.NODE_ENV == 'development') {
    dbFile = path.join(path.resolve('./src/database/test.duckdb'));
} else {
    dbFile = path.join(path.resolve(__dirname), '../../../') + 'test.duckdb';
}

// export const db = new DuckDB.Database(
//     dbFile,
//     {
//         "access_mode": "READ_WRITE",
//         // "max_memory": "1024MB",
//         "threads": "4"
//     },
//     (error) => {
//         if (error) {
//             console.log(error);
//         }
//     }
// );


export const database: interfaces.Database = {

    get_df: async function (): Promise<Array<interfaces.DFList>> {

        // attempt to close the connection after each query
        const db = new DuckDB.Database(dbFile, {
            "access_mode": "READ_WRITE"
        });

        const connection = new Promise<Array<interfaces.DFList>>((resolve) => {

            db.all('SELECT Area, Gender, Age, Children FROM df LIMIT 10', (error, result) => {
                if (error) {
                    console.log("===== Error get_df =====");
                    console.log(error);
                }

                resolve(result as interfaces.DFList[]);
            });
        });

        const result = await connection;

        db.run("FORCE CHECKPOINT");
        db.close();

        return result;
    }
}
