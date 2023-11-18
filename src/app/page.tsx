"use client"

import QRCode from "qrcode";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [qrSent, setQrSent] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState("");

  const getQrCode = async () => {
    setQrSent(true);
    const res = await fetch("/getqr");
    const data = await res.json();
    const qrCode = await QRCode.toDataURL(data.qr_code);
    setQrCodeURL(qrCode);

    // const link = document.createElement("a");
    // link.href = qrCode;
    // link.download = "qrcode.png";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    setQrSent(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getQrCode}>
        Generate qr code
      </button>
      <div className="mt-10"/>
      {qrSent && <p className="mt-10">Generating qr code...</p>}
      {qrCodeURL && <Image src={qrCodeURL} alt="qrcode" width={400} height={400} />}
    </main>
  )
}
