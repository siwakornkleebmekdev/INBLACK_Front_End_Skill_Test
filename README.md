# INBLACKM Order Tracking

## สรุปผลงาน

- ค้นหาออเดอร์ด้วยหมายเลขหรือชื่อเกม พร้อมกรองสถานะ คัดลอกเลขออเดอร์ และดูรายละเอียด
- เพิ่มหน้าวิธีใช้งาน หน้า 404 และรองรับหน้าจอมือถือ
- ปรับสี เงา มุมโค้ง และตัวอักษรตาม Figma Foundations
- ใช้ Press Start 2P เฉพาะโลโก้และเลขออเดอร์ ข้อความอื่นใช้ Prompt
- ใช้ข้อมูลตัวอย่างเดิม 5 รายการ ยังไม่เชื่อมฐานข้อมูลหรือระบบชำระเงินจริง
- ผ่านการทดสอบค้นหา 7 กรณี, TypeScript และ production build

## เปิดใช้งาน

ใช้ Node.js 22.18 ขึ้นไป แล้วดับเบิลคลิก `START.cmd` หรือรัน:

```sh
npm install
npm run dev
```

เปิด http://localhost:3000 — ใช้ Webpack สำหรับ dev และ build

ฟอนต์ติดตั้งผ่าน Fontsource และเสิร์ฟจากเว็บเอง ไม่เรียก Google Fonts ขณะใช้งาน

อ้างอิง: [Figma Foundations](https://www.figma.com/design/JO7LQWL8MOLIlcbhWv9sTe/?node-id=12-2) — ไฟล์ที่เข้าถึงได้มีเฉพาะ Foundations ยังไม่มีเฟรมหน้าจอเต็มให้เทียบแบบ 1:1
