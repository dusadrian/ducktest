import { database } from "./database/database";
import * as path from "path";


window.addEventListener("DOMContentLoaded", () => {
    let file = path.basename(location.href);

    switch (file) {
        case 'index.html':
            index()
            break;
    }
});


const index = () => {
    document.getElementById("start").addEventListener("click", () => {
        database.get_df().then((result) => {
            console.log(result);
        });
    });
}
