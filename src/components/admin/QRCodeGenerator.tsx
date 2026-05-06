"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface QRCodeGeneratorProps {
  url: string;
  title?: string;
  trigger?: React.ReactNode;
}

export function QRCodeGenerator({ url, title = "QR Code Undangan", trigger }: QRCodeGeneratorProps) {
  const [size, setSize] = useState("256");
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `qr-code-${size}px.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">QR Code</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <div ref={canvasRef} className="rounded-lg bg-white p-4">
            <QRCodeCanvas value={url} size={parseInt(size)} level="H" />
          </div>

          <p className="text-xs text-[#94A3B8] text-center break-all">{url}</p>

          <div className="flex items-center gap-3 w-full">
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256 x 256 px</SelectItem>
                <SelectItem value="512">512 x 512 px</SelectItem>
                <SelectItem value="1024">1024 x 1024 px</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" /> Unduh PNG
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
