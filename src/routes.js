import express from "express";
import { fetchConfigById, fetchStatusById } from "./services/configService.js";
import { fetchLogs, createLog } from "./services/logService.js";

const router = express.Router();

// GET /configs/:droneId
router.get("/configs/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    const config = await fetchConfigById(droneId);
    if (!config) return res.status(404).json({ error: "Not found" });
    // ตอบเฉพาะ fields ที่กำหนด (service ตัดให้แล้ว)
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: String(err) });
  }
});

// GET /status/:droneId
router.get("/status/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    const status = await fetchStatusById(droneId);
    if (!status) return res.status(404).json({ error: "Not found" });
    res.json(status); // { condition: "good" }
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: String(err) });
  }
});

// GET /logs/:droneId  (รองรับ ?page=1&perPage=12)
router.get("/logs/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 12);
    const result = await fetchLogs(droneId, { page, perPage });
    // ส่งเฉพาะ fields ที่งานกำหนดใน result.items
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: String(err) });
  }
});

// POST /logs
router.post("/logs", async (req, res) => {
  try {
    const { drone_id, drone_name, country, celsius } = req.body || {};
    if (
      drone_id == null ||
      !drone_name ||
      !country ||
      (celsius == null || isNaN(Number(celsius)))
    ) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const created = await createLog({
      drone_id: Number(drone_id),
      drone_name,
      country,
      celsius: Number(celsius)
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: String(err) });
  }
});

export default router;
