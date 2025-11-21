"use client";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCcw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PhotoData } from "./types";

interface PhotoModalProps {
  photos: PhotoData[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoModal({
  photos,
  initialIndex,
  isOpen,
  onClose,
}: PhotoModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Reset transformations when opening
      setZoom(1);
      setRotation(0);
      setPanPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const resetTransformations = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleCloseModal = useCallback(() => {
    onClose();
    resetTransformations();
  }, [resetTransformations, onClose]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleRotate = useCallback((direction: "cw" | "ccw") => {
    const angle = direction === "cw" ? 90 : -90;

    setRotation((prev) => (prev + angle) % 360);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

    resetTransformations();
  }, [photos.length, resetTransformations]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

    resetTransformations();
  }, [photos.length, resetTransformations]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleCloseModal();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "+":
        case "=":
          e.preventDefault();
          handleZoomIn();
          break;
        case "-":
          e.preventDefault();
          handleZoomOut();
          break;
        case "r":
        case "R":
          e.preventDefault();
          handleRotate("cw");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    isOpen,
    handleCloseModal,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    goToPrevious,
    goToNext,
  ]);

  const handleDownload = async () => {
    const currentPhoto = photos[currentIndex];

    try {
      const response = await fetch(currentPhoto.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `vehicle-photo-${currentIndex + 1}.jpg`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (!mounted || !isOpen || !photos.length) return null;

  const currentPhoto = photos[currentIndex];

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h3 className="text-white font-medium">
              {currentPhoto.title || `Photo ${currentIndex + 1}`}
            </h3>
            <span className="text-white text-sm opacity-75">
              {currentIndex + 1} of {photos.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 h-8"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 h-8"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleRotate("ccw")}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 h-8"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleRotate("cw")}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 h-8"
            >
              <RotateCw className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              onClick={handleDownload}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 h-8"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              onClick={handleCloseModal}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 h-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="relative w-[50%] h-[50%] flex items-center justify-center">
        <Image
          fill
          src={currentPhoto.url}
          alt={currentPhoto.title || "Photo"}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
            transformOrigin: "center center",
          }}
          draggable={false}
        />
      </div>

      {photos.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black opacity-80 hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center gap-2 p-4 overflow-x-auto">
            {photos.map((photo, index) => (
              <button
                type="button"
                key={photo._id}
                onClick={() => {
                  setCurrentIndex(index);
                  resetTransformations();
                }}
                className={cn(
                  "relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 !border-transparent transition-all",
                  index === currentIndex && "!border-white",
                )}
              >
                <Image
                  fill
                  src={photo.url}
                  alt={photo.title || "Thumbnail"}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm px-4 py-2 rounded-lg">
        <div className="flex items-center gap-4 text-xs opacity-75">
          <span>← → Navigate</span>
          <span>+ - Zoom</span>
          <span>R Rotate</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
