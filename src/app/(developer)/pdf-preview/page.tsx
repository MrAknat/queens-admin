"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { Suspense, useEffect, useState } from "react";
import { AppraisalPdf } from "@/components/appraisals/AppraisalPdf";
import { Loader } from "@/components/ui";
import { useAppraisal } from "@/hooks/useAppraisals";

function PdfPreviewContent() {
  const searchParams = useSearchParams();
  const appraisalId = searchParams.get("id");

  const { data: appraisal, isLoading } = useAppraisal(appraisalId || "");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>();

  useEffect(() => {
    if (!appraisal) return;

    const publicUrl = process.env.NEXT_PUBLIC_URL
      ? `${process.env.NEXT_PUBLIC_URL}/appraisals/${appraisal._id}`
      : null;

    if (publicUrl) {
      QRCode.toDataURL(publicUrl, {
        width: 80,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [appraisal]);

  if (!appraisalId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No Appraisal Selected</h1>
          <p className="text-gray-600">
            Add{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">
              ?id=APPRAISAL_ID
            </code>{" "}
            to the URL
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader className="w-8 h-8" />
      </div>
    );
  }

  if (!appraisal) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Appraisal Not Found</h1>
          <p className="text-gray-600">ID: {appraisalId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <PDFViewer width="100%" height="100%">
        <AppraisalPdf appraisal={appraisal} qrCodeDataUrl={qrCodeDataUrl} />
      </PDFViewer>
    </div>
  );
}

export default function PdfPreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <Loader className="w-8 h-8" />
        </div>
      }
    >
      <PdfPreviewContent />
    </Suspense>
  );
}
