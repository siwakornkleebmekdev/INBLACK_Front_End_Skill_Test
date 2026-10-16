# INBLACKM Order Tracking

## สรุปผลงาน

- ค้นหาออเดอร์ด้วยหมายเลขหรือชื่อเกม พร้อมกรองสถานะ คัดลอกเลขออเดอร์ และดูรายละเอียด
- เพิ่มหน้าวิธีใช้งาน หน้า 404 และรองรับหน้าจอมือถือ
- ใช้ฟอนต์ Pixel เฉพาะโลโก้และเลขออเดอร์ ข้อความอื่นใช้ Tahoma
- ใช้ข้อมูลตัวอย่างเดิม 5 รายการ ยังไม่เชื่อมฐานข้อมูลหรือระบบชำระเงินจริง
- ผ่านการทดสอบค้นหา 7 กรณี, TypeScript และ production build

## เปิดใช้งาน

ใช้ Node.js 22.18 ขึ้นไป แล้วดับเบิลคลิก `START.cmd` หรือรัน:

```sh
npm install
npm run dev
```

เปิด http://localhost:3000 — ใช้ Webpack สำหรับ dev และ build

ฟอนต์ Pixel: [Sevenish](https://github.com/SauceDLX/Sevenish) (MIT) พร้อมใบอนุญาตใน `public/fonts`
