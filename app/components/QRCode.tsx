"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ value, size = 200 }) => {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      bgColor="white"
      fgColor="black"
      level="H"
      includeMargin={false}
    />
  );
};

export default QRCodeComponent;
