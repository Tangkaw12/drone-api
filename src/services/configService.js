import axios from "axios";

const CONFIG_URL = process.env.CONFIG_URL;

/**
 * ดึง config ทั้งหมดจาก Server1 แล้วกรองเอาเฉพาะ drone ที่ตรง id
 * หมายเหตุ: รูป JSON ต้นทางมักเป็น array ของ drone objects
 */
export async function fetchConfigById(droneId) {
  const { data } = await axios.get(CONFIG_URL, { timeout: 10000 });
  // สมมุติ data = { drones: [...] } หรือเป็น array ตรง ๆ ก็ลองรองรับทั้งสองแบบ
  const list = Array.isArray(data) ? data : (Array.isArray(data?.drones) ? data.drones : []);
  const found = list.find(d => String(d.drone_id) === String(droneId));
  if (!found) return null;

  // ส่งคืนเฉพาะฟิลด์ที่อาจารย์กำหนด
  return {
    drone_id: found.drone_id,
    drone_name: found.drone_name,
    light: found.light,
    country: found.country,
    weight: found.weight
  };
}

/** สำหรับ /status/:droneId -> ตอบเฉพาะ condition */
export async function fetchStatusById(droneId) {
  const { data } = await axios.get(CONFIG_URL, { timeout: 10000 });
  const list = Array.isArray(data) ? data : (Array.isArray(data?.drones) ? data.drones : []);
  const found = list.find(d => String(d.drone_id) === String(droneId));
  if (!found) return null;
  return { condition: found.condition };
}
