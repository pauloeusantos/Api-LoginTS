
import express from "express";
import cors from "cors";
import handleError from "./middleware/handler-error";
import router from "./router/router";

const port = process.env.WS_PORT ?  
    parseInt(process.env.WS_PORT) :
    3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(handleError());

app.listen(port, () => {
    console.log(`O servidor está sendo executado na porta ${port}`);
});