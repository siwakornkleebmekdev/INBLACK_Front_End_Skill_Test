# ผลการตรวจสอบ — 17 ตุลาคม 2026

- Next.js 16.4.2 / Node.js 24.19.0
- npm test: ผ่าน 7 กรณี
- npm run typecheck: ผ่าน
- npm run build: ผ่านด้วย Webpack รวมหน้ารายละเอียดออเดอร์ 5 รายการ
- HTTP: หน้าหลัก, /help, /orders/ORD-1023 ตอบ 200; /orders/ORD-9999 ตอบ 404
- Browser: ค้นหา “เพชร” พบเฉพาะ Free Fire, เลือก ORD-1024 จากหมวดประวัติด้วย Enter แล้วย้ายหมวดได้ถูกต้อง, เปิดหน้ารายละเอียดสำเร็จ
- Responsive: ตรวจที่ความกว้าง 390px ไม่มี horizontal overflow และเมนูมือถือเปิดได้
- ไม่พบ console error ในการทดสอบหน้าเว็บ
- SHA-256 ของไฟล์เดิมทั้ง 68 ไฟล์ตรงกับก่อนเริ่มงาน ไม่มีการแก้ไขต้นฉบับ

ใช้ข้อมูลตัวอย่างเท่านั้น ยังไม่เชื่อมระบบชำระเงินหรือฐานข้อมูลจริงตามขอบเขตที่ยืนยัน

## อัปเดตฟอนต์ Pixel
- เปลี่ยนทั้งเว็บเป็น Sevenish (ไทยและอังกฤษ) แบบ self-hosted พร้อมใบอนุญาต MIT
- Build ผ่าน และตรวจในเบราว์เซอร์แล้วว่าฟอนต์โหลดสำเร็จ


## ปรับขอบเขตฟอนต์ Pixel ตามคำขอล่าสุด
- Sevenish ใช้เฉพาะโลโก้และเลขออเดอร์ (รายการ คำแนะนำ และหน้ารายละเอียด)
- ข้อความทั่วไปใช้ Tahoma/system sans-serif; ไม่ได้ติดตั้ง Prompt เพิ่ม
- Production build และ TypeScript ผ่าน
- ไม่สามารถเปิด browser preview รอบนี้ได้ เนื่องจาก browser เชื่อมต่อ local server ไม่สำเร็จ


## ปรับตาม Figma Foundations (12:2)
- ติดตั้ง Prompt 400/500/600/700 และ Press Start 2P 400 ผ่าน Fontsource สำเร็จ
- ปรับ Light semantic colors ทั้ง 38 ค่า และเงา XS/SM/LG ตาม Figma
- Production build และ TypeScript ผ่าน
- Browser desktop: header 64px, main 672px, content 624px, search padding 32px; title 30/36, logo 16/24, order ID 12/16
- Browser mobile 390px: padding 16px, search padding 20px, title 24/32, การ์ดแนวตั้ง ไม่ล้นแนวนอน
- ตรวจว่า Prompt และ Press Start 2P โหลดจริง ไม่พบ console error
- ไม่มี static image/SVG assets ในเฟรมอ้างอิง และไม่มี Code Connect mappings ที่ส่งกลับ
- ยังเทียบหน้าจอเต็ม 1:1 ไม่ได้ เพราะ Figma ที่เข้าถึงได้มีเฉพาะหน้า Foundations

