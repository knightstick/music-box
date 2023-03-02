import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

const useQrScanner = ({ onDecode }: { onDecode: (data: string) => void }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [trackUrl, setTrackUrl] = useState<string | null>(null);
  const [readError, setReadError] = useState<string | null>(null);

  const startScanning = () => setIsScanning(true);
  const stopScanning = () => setIsScanning(false);

  const onScan = (result: string) => {
    setTrackUrl(result);
    onDecode(result)
    setIsScanning(false);
  };

  const onError = (error: Error) => {
    setReadError(error?.message);
    setIsScanning(false);
  };

  return {
    isScanning,
    trackUrl,
    readError,
    startScanning,
    stopScanning,
    onScan,
    onError,
  };
};

export interface Props {
  onDecode: (result: string) => void;
}


export const QrCodeReader = ({ onDecode }: { onDecode: (data: string) => void }) => {
  const { isScanning, startScanning, stopScanning, onScan, onError } = useQrScanner({ onDecode });


  if (!isScanning) {
    return (
      <button onClick={() => startScanning()}>Scan QR Code</button>
    );
  }

  return (
    <>
      <QrScanner
        onDecode={(result) => { onScan(result) }}
        onError={(error) => { onError(error) }}
      />
      <button onClick={() => stopScanning()}>Stop</button>
    </>
  );
};
