import app from "./app";
import {PORT} from "./config"


app.listen(PORT, () => {
    console.log(`Server Runnaing on the PORT ${PORT}`);
})