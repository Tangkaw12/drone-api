import axios from "axios";

const LOG_URL = process.env.LOG_URL;
const LOG_API_TOKEN = process.env.LOG_API_TOKEN;

const api = axios.create({
  baseURL: LOG_URL,
  headers: { Authorization: `Bearer ${LOG_API_TOKEN}` },
  timeout: 10000
});

/**
 * อ่าน logs ของ droneId เรียง created ล่าสุดก่อน และจำกัด 12 รายการ
 * เพิ่ม query สำหรับ pagination ได้ด้วย (page, perPage) — ให้คะแนนพิเศษ
 */
export async function fetchLogs(droneId, { page = 1, perPage = 12 } = {}) {
  // PocketBase มีพารามิเตอร์ filter/sort/page/perPage
  // เรียง created desc และ filter ด้วย drone_id เท่ากับค่า droneId
  const params = {
    page,
    perPage,
    filter: `drone_id=${JSON.stringify(Number(droneId))}`,
    sort: "-created"
  };

  const { data } = await api.get("", { params });

  // map เหลือเฉพาะคอลัมน์ที่งานกำหนด
  const items = (data?.items || []).map(x => ({
    drone_id: x.drone_id,
    drone_name: x.drone_name,
    created: x.created,
    country: x.country,
    celsius: x.celsius
  }));

  return {
    page: data?.page ?? page,
    perPage: data?.perPage ?? perPage,
    totalItems: data?.totalItems ?? items.length,
    totalPages: data?.totalPages ?? 1,
    items
  };
}

/**
 * สร้าง log record ใหม่ (ฟิลด์ตามที่งานกำหนด: drone_id, drone_name, country, celsius)
 */
export async function createLog({ drone_id, drone_name, country, celsius }) {
  const payload = { drone_id, drone_name, country, celsius };
  const { data } = await api.post("", payload);
  return data;
}
