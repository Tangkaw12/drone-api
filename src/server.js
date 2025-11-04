// src/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// healthcheck
app.get("/", (_, res) => res.send("API running"));

// TODO: ถ้าคุณมี routes แยกไฟล์อยู่ ให้ import แล้วใช้:
// import router from "./routes.js";
// app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
