import express from "express"
import pkill from "tree-kill"

const app = express();
const portstring = process.argv[2] ?? process.env["PORT"];
if (!portstring) {
    throw new Error("port must be provided as arg or environment variable");
}
const port = parseInt(`${portstring}`);
if (isNaN(port)) {
    throw new Error(`invalid port ${portstring}`);
}

let s = "Hello world!";
app.get('/', (_, res) => {
    res.send(s)
})

const serv = app.listen(port);
console.log("listening on", port);

process.on("SIGTERM", () => {
    s = "This server got a SIGTERM and will terminate soon!";
    console.log("SIGTERM received!");

    setTimeout(() => serv.close(), 5000);
});
