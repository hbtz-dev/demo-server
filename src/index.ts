import express from "express"

const app = express();
let message = process.env["MESSAGE"] ?? "Hello world!";
const portstring = process.argv[2] ?? process.env["PORT"];
if (!portstring) {
    throw new Error("port must be provided as arg or environment variable");
}
const port = parseInt(`${portstring}`);
if (isNaN(port)) {
    throw new Error(`invalid port ${portstring}`);
}

app.get('/', (_, res) => {
    res.send(message);
})

const serv = app.listen(port);
console.log("listening on", port);

process.on("SIGTERM", () => {
    message = "This server got a SIGTERM and will terminate soon!";
    console.log("SIGTERM received!");

    setTimeout(() => serv.close(), 5000);
});
