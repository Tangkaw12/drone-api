# 🛰️ Drone API Server (Assignment #1)

โปรเจกต์นี้เป็น **API Server** ที่พัฒนาด้วย **Node.js + Express** เพื่อให้บริการดึงข้อมูล **Configuration** และ **Logs** ของ Drone  
This project is an **API Server built with Node.js and Express** to manage drone configurations and logs.

---

## 🚀 วิธีใช้งาน (How to Run)

### 1. โคลนโปรเจกต์ (Clone the repository)

git clone <YOUR_REPO_URL>

2. ติดตั้ง dependencies (Install dependencies)
npm install

3. สร้างไฟล์ .env เพื่อเก็บตัวแปรสำคัญ (Create .env file)

สร้างไฟล์ชื่อ .env ที่ root directory และเพิ่มค่าตัวแปรดังนี้:

# === Server1: Drone Config Server (Google Apps Script) ===
CONFIG_URL=https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec

# === Server2: Drone Log Server (PocketBase) ===
LOG_URL=https://app-tracking.pockethost.io/api/collections/drone_logs/records
LOG_API_TOKEN=20250901efx

# === PORT ===
PORT=3000


⚠️ หมายเหตุ: ห้ามอัปโหลดไฟล์ .env ขึ้น GitHub เพราะมีข้อมูลลับ เช่น Token และ URL จริง

4. เริ่มรันเซิร์ฟเวอร์ (Run the server)
npm run dev


เมื่อรันสำเร็จจะเห็นข้อความ

API running on port 3000


เปิดใช้งานได้ที่ http://localhost:3000

🧭 ตัวอย่างการทดสอบ API (API Testing Examples)
📘 GET /configs/:droneId

ดึงข้อมูลการตั้งค่าของโดรน (Fetch the drone’s configuration)

GET http://localhost:3000/configs/66010710

📗 GET /status/:droneId

ดูสถานะของโดรน (Fetch the drone’s status)

GET http://localhost:3000/status/66010710

📙 GET /logs/:droneId

ดูประวัติการบันทึกอุณหภูมิ (View the drone’s logs)

GET http://localhost:3000/logs/66010710?perPage=12&page=1

📒 POST /logs

เพิ่มข้อมูล log ใหม่ (Create a new log)

POST http://localhost:3000/logs
Content-Type: application/json


ตัวอย่าง Body:

{
  "drone_id": 66010710,
  "drone_name": "Iron Wolf",
  "country": "Russia",
  "celsius": 45
}


ผลลัพธ์:

{
  "id": "rec_xyz123",
  "drone_id": 66010710,
  "drone_name": "Iron Wolf",
  "country": "Russia",
  "celsius": 45,
  "created": "2025-11-04T18:55:51.688Z"
}

⚙️ PowerShell Commands (สำหรับ Windows)

สำหรับผู้ใช้ Windows สามารถติดตั้งและรันได้ด้วยคำสั่งเดียว:

npm i; npm run dev


หรือหากต้องการเริ่มจากการติดตั้ง Node.js อัตโนมัติ:

winget install OpenJS.NodeJS -e
npm install
npm run dev

🧾 โครงสร้างโปรเจกต์ (Project Structure)
drone-api/
├─ src/
│  ├─ server.js           # จุดเริ่มต้นของแอป (main entry point)
│  ├─ routes.js           # กำหนดเส้นทาง API ทั้งหมด
│  └─ services/           # รวมฟังก์ชันที่เรียก external APIs
│     ├─ configService.js # ดึง config จาก Google Apps Script
│     └─ logService.js    # ดึงและส่ง log ไปยัง PocketBase
├─ .gitignore
├─ package.json
├─ README.md
└─ .env (ไม่ต้องอัปโหลด)

✅ Status
Component	Status	Description
GET /configs/:droneId	🟢 Success	ดึงข้อมูล Drone Config ได้แล้ว
GET /status/:droneId	🟢 Success	แสดง condition ของโดรน
GET /logs/:droneId	🟢 Success	ดึงข้อมูล Logs ล่าสุดก่อน จำกัด 12
POST /logs	🟢 Success	เพิ่ม Log ได้และแสดงใน PocketBase
Frontend Connection	🟢 Success	ดึงผ่าน API สำเร็จ แสดงผลหน้าเว็บ
👩‍💻 ผู้จัดทำ (Author)

ชื่อ: นางสาวรุ่งอรุณ แก้วสุวรรณ์
รหัสนักศึกษา: 66010710
Drone Name: Iron Wolf (Russia)
ภาควิชา: ไอโอทีและฟิสิกส์อุตสาหกรรม



