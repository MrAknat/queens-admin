import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadPhoto } from "@/hooks/useAppraisals";

interface AddPhotoDialogProps {
  appraisalId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddPhotoDialog({
  appraisalId,
  isOpen,
  onClose,
}: AddPhotoDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadPhoto, isPending } = useUploadPhoto(appraisalId);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("files", selectedFile);

    uploadPhoto(formData, {
      onSuccess: () => {
        handleClearFile();
        onClose();
      },
    });
  };

  const handleClose = () => {
    handleClearFile();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Photo</DialogTitle>
          <DialogDescription>
            Upload a new photo for this appraisal.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!selectedFile ? (
            <button
              type="button"
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                Click to upload photo
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, GIF up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </button>
          ) : (
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                width={64}
                height={64}
                src={previewUrl || ""}
                alt="Preview"
                className="w-full h-64 object-contain bg-background"
              />
              <button
                type="button"
                onClick={handleClearFile}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="p-2 bg-background border-t border-gray-200">
                <p className="text-sm font-medium truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isPending}
            className="gap-2"
          >
            {isPending && <Upload className="h-4 w-4 animate-pulse" />}
            {isPending ? "Uploading..." : "Upload Photo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
