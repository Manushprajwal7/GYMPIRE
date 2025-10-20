"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan") || "3month";
  const [paymentUrl, setPaymentUrl] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "sinumathew2-2@okicici";
  const gymName = "GYMPIRE";

  const plans: Record<
    string,
    { label: string; price: number; description: string }
  > = {
    "3month": {
      label: "3 Months",
      price: 3499,
      description: "Access to gym equipment, locker room & free weights",
    },
    "6month": {
      label: "6 Months",
      price: 5499,
      description:
        "All 3 Month features + 2 group classes/week + personalized workout",
    },
    "12month": {
      label: "12 Months",
      price: 6999,
      description:
        "All 6 Month features + unlimited group classes + 2 PT/month + nutrition",
    },
  };

  const selectedPlan = plans[planKey] || plans["3month"];

  useEffect(() => {
    const txnId = `txn_${Date.now()}`;
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      gymName
    )}&mc=0000&tid=${txnId}&tr=${txnId}&tn=${encodeURIComponent(
      selectedPlan.label
    )}&am=${selectedPlan.price}&cu=INR`;

    setPaymentUrl(upiLink);
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, [planKey, selectedPlan.label, selectedPlan.price]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="text-center text-white max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Complete Your Payment
        </h1>

        <h2 className="text-2xl font-semibold mb-1">{selectedPlan.label}</h2>
        <p className="text-sm text-gray-300 mb-3">{selectedPlan.description}</p>
        <p className="text-2xl font-bold text-green-400 mb-10">
          ₹{selectedPlan.price}
        </p>

        {isMobile ? (
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-200 inline-block"
          >
            Pay with UPI
          </a>
        ) : (
          <div className="mt-4 flex flex-col items-center space-y-4">
            <p className="text-base font-medium">Scan this QR code to pay:</p>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <QRCodeSVG value={paymentUrl} size={180} />
            </div>
            <p className="text-xs text-gray-300 italic">
              Use GPay, PhonePe, Paytm, or any UPI-enabled app.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
