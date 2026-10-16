# Figma → Next.js

อ้างอิงไฟล์ JO7LQWL8MOLIlcbhWv9sTe, หน้า `00 · Foundations`, เฟรม `12:2`

| Figma | การใช้งาน |
| --- | --- |
| Light semantic colors 38 ค่า | CSS variables ใน `src/app/globals.css` ใช้ sRGB ตาม Figma |
| Prompt 400 / 500 / 600 / 700 | ข้อความทั่วไป โหลดด้วย Fontsource ใน `src/app/layout.tsx` |
| Pixel/Brand · Press Start 2P 16/24 | โลโก้บนเดสก์ท็อป |
| Pixel/Order · Press Start 2P 12/16 | หมายเลขออเดอร์ในรายการและคำแนะนำ |
| Heading Desktop 30/36, Mobile 24/32 | หัวเรื่องหน้าหลัก |
| Section 18/28, Body 16/24 และ 14/20, Caption 12/16 | หัวข้อค้นหา คำอธิบาย ชื่อเกม วันที่ |
| Radius 6/8/10/14/18px | theme radius tokens เดิมที่ตรงกับ Figma |
| Shadow XS / SM / LG | เงา 0 1 2 / 0 1 3 / 0 10 15 ตาม Figma |
| Desktop main 672px, content 624px | max-w-2xl พร้อม padding 24px |
| Mobile padding 16px, search padding 20px | responsive classes เดิม |
| Navbar 64px, links ≥768px, search ≥1024px | responsive classes เดิม |

ใช้คอมโพเนนต์และ semantic tokens เดิม ไม่สร้างหน้าเอกสาร Foundations แทนหน้าติดตามออเดอร์ ไม่มีภาพหรือ SVG asset ในเฟรมอ้างอิงที่ต้องนำเข้ามาใช้ในเว็บ

ขอบเขต: ปรับตาม Foundations ที่อ่านได้จาก Figma เท่านั้น เครื่องมือรายงานว่ามีเพียงหน้าเดียว แม้ข้อความในแบบกล่าวถึงหน้า Components และ Patterns จึงยังยืนยันความตรงกับหน้าจอเว็บเต็มแบบ 1:1 ไม่ได้ คงการค้นหา เมนูช่วยเหลือ หน้ารายละเอียด และข้อมูลตัวอย่างเดิมไว้
