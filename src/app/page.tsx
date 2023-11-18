"use client"

import QRCode from "qrcode";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [qrCodeURL, setQrCodeURL] = useState("");

  const getQrCode = async () => {
    const res = await fetch("/getqr");
    const data = await res.json();
    const qrCode = await QRCode.toDataURL(data.qr_code);
    setQrCodeURL(qrCode);

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getQrCode}>
        Generate qr code
      </button>
      <div className="mt-10"/>
      {qrCodeURL && <Image src={qrCodeURL} alt="qrcode" width={200} height={200}  />}
    </main>
  )
}
