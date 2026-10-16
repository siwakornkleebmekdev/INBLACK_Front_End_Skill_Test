"use client";
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <main className="p-12 text-center"><h1 className="text-2xl font-bold">โหลดข้อมูลไม่สำเร็จ</h1><button onClick={reset} className="mt-6 rounded-lg bg-primary px-5 py-3 text-primary-foreground">ลองอีกครั้ง</button></main>}
