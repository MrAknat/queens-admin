import imageCompression from "browser-image-compression";
import { Loader2, Upload, X } from "lucide-react";
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadPhoto, isPending } = useUploadPhoto(appraisalId);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setIsCompressing(true);
      const newFiles: File[] = [];
      const newUrls: string[] = [];

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          try {
            const compressedFile = await imageCompression(file, options);
            const finalFile = new File([compressedFile], file.name, {
              type: compressedFile.type,
            });
            newFiles.push(finalFile);
            newUrls.push(URL.createObjectURL(compressedFile));
          } catch (error) {
            console.error(`Error compressing image ${file.name}:`, error);
            newFiles.push(file);
            newUrls.push(URL.createObjectURL(file));
          }
        }

        setSelectedFiles((prev) => [...prev, ...newFiles]);
        setPreviewUrls((prev) => [...prev, ...newUrls]);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleClearFiles = () => {
    previewUrls.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    setSelectedFiles([]);
    setPreviewUrls([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);

    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newUrls = [...previewUrls];
    newUrls.splice(index, 1);
    setPreviewUrls(newUrls);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    uploadPhoto(formData, {
      onSuccess: () => {
        handleClearFiles();
        onClose();
      },
    });
  };

  const handleClose = () => {
    handleClearFiles();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Photos</DialogTitle>
          <DialogDescription>
            Upload one or more photos for this appraisal.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span>
                </p>
              </div>
              <input
                ref={fileInputRef}
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {isCompressing && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Compressing images...</span>
            </div>
          )}

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isPending || isCompressing}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
