# 🛰️ Drone API Server (Assignment #1)

โปรเจกต์นี้เป็น **API Server** ที่พัฒนาด้วย **Node.js + Express** เพื่อให้บริการดึงข้อมูล **Configuration** และ **Logs** ของ Drone  
This project is an **API Server built with Node.js and Express** to manage drone configurations and logs.

---

## 👩‍🎓 ผู้จัดทำ (Author)
- **ชื่อ:** นางสาวรุ่งอรุณ แก้วสุวรรณ์
- **รหัสนักศึกษา:** 66010710
- **Drone Name:** Iron Wolf (Russia)
- **ภาควิชา:** ไอโอทีและฟิสิกส์อุตสาหกรรม

---

## 🚀 วิธีใช้งาน (How to Run)

### 1) โคลนโปรเจกต์ (Clone the repository)
```bash
git clone <YOUR_REPO_URL>
cd drone-api
```

### 2) ติดตั้ง dependencies (Install dependencies)
```bash
npm install
```

### 3) สร้างไฟล์ `.env` (Create `.env`)
สร้างไฟล์ `.env` ที่ root directory และเพิ่มค่าตามนี้
```bash
# === Server1: Drone Config Server (Google Apps Script) ===
CONFIG_URL=https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec

# === Server2: Drone Log Server (PocketBase) ===
LOG_URL=https://app-tracking.pockethost.io/api/collections/drone_logs/records
LOG_API_TOKEN=20250901efx

# === PORT ===
PORT=3000
```

> ⚠️ **ห้ามอัปโหลด `.env` ขึ้น GitHub** (Contains secrets). Make sure `.gitignore` includes `.env` and `node_modules`.

### 4) รันเซิร์ฟเวอร์ (Run the server)
```bash
npm run dev
```
เปิดใช้งานได้ที่ http://localhost:3000

---

## 🧭 ตัวอย่างทดสอบ API (API Testing Examples)

### GET /configs/:droneId
```bash
curl http://localhost:3000/configs/66010710
```

### GET /status/:droneId
```bash
curl http://localhost:3000/status/66010710
```

### GET /logs/:droneId
```bash
curl "http://localhost:3000/logs/66010710?perPage=12&page=1"
```

### POST /logs
```bash
curl -X POST http://localhost:3000/logs   -H "Content-Type: application/json"   -d '{"drone_id":66010710,"drone_name":"Iron Wolf","country":"Russia","celsius":45}'
```

---

## 🧾 โครงสร้างโปรเจกต์ (Project Structure)
```
drone-api/
├─ src/
│  ├─ server.js
│  ├─ routes.js
│  └─ services/
│     ├─ configService.js
│     └─ logService.js
├─ .gitignore
├─ package.json
├─ README.md
└─ .env  # do not commit
```

---

## ☁️ Deployment (Render)
> ตัวอย่างการ deploy API ขึ้น Render.com

1. Push โค้ดไป GitHub
2. ไปที่ **Render → New + → Web Service → Connect repo**
3. **Build Command:** `npm install`  
   **Start Command:** `npm start`
4. เพิ่ม Environment Variables ใน Render ให้ครบ: `CONFIG_URL`, `LOG_URL`, `LOG_API_TOKEN`, `PORT`
5. Deploy เสร็จแล้ว จะได้ URL ประมาณ `https://drone-api.onrender.com`
6. ใช้ URL นี้เป็น `API_BASE` ฝั่ง frontend

---

## ✅ Status
| Component | Status | Notes |
|---|---|---|
| GET /configs/:droneId | 🟢 | OK |
| GET /status/:droneId | 🟢 | OK |
| GET /logs/:droneId | 🟢 | Latest first, limit 12 |
| POST /logs | 🟢 | Creates PocketBase record |

© 2025 • Drone API Project
