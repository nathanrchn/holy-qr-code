"use client"
import { useState } from "react";
import { useQRCode } from "next-qrcode";

export default function Home() {
  const [qrCode, setQrCode] = useState("");
  const { Canvas } = useQRCode();

  const getQrCode = async () => {
    const res = await fetch("/getqr");
    const data = await res.json();
    setQrCode(data.qr_code);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getQrCode}>
        Generate qr code
      </button>
      <div className="mt-10"/>
      {qrCode && <Canvas text={qrCode} options={{scale: 4, width: 200}} />}
    </main>
  )
}
