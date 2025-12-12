"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Trash,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { useDeletePhoto, useUpdatePhoto } from "@/hooks/useAppraisals";
import { cn } from "@/lib/utils";
import { AddPhotoDialog } from "./AddPhotoDialog";
import { PhotoModal } from "./PhotoModal";
import type { PhotoData } from "./types";

interface PhotoCarouselProps {
  appraisalId: string;
  photos: PhotoData[];
  readOnly?: boolean;
}

export function PhotoCarousel({
  appraisalId,
  photos,
  readOnly = false,
}: PhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const { mutate: updatePhoto } = useUpdatePhoto(appraisalId);
  const { mutate: deletePhoto } = useDeletePhoto(appraisalId);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handlePhotoClick = (photoIndex: number) => {
    setModalPhotoIndex(photoIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (e: React.MouseEvent, photo: PhotoData) => {
    e.stopPropagation();
    setEditingPhotoId(photo._id);
    setEditingTitle(photo.title);
  };

  const handleTitleSave = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (editingPhotoId) {
      updatePhoto({ photoId: editingPhotoId, title: editingTitle });
      setEditingPhotoId(null);
    }
  };

  const handleTitleCancel = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setEditingPhotoId(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, photo: PhotoData) => {
    e.stopPropagation();
    deletePhoto(photo._id);
  };

  if (!photos || photos.length === 0) {
    if (readOnly) {
      return (
        <Card>
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Vehicle Photos</h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-50 rounded-lg border-2 border-dashed border-gray-200">
              <Camera className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500 font-medium">No photos available</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Vehicle Photos</h3>
            </div>
            <Button
              variant="outline"
              className="gap-2 h-8 px-3"
              onClick={() => setIsAddPhotoOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Photos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-50 rounded-lg border-2 border-dashed border-gray-200">
            <Camera className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 font-medium">No photos available</p>
            <p className="text-sm text-gray-400 mb-4">
              Upload photos to document the vehicle condition
            </p>
            <Button onClick={() => setIsAddPhotoOpen(true)}>Add Photos</Button>
          </div>
        </CardContent>

        <AddPhotoDialog
          appraisalId={appraisalId}
          isOpen={isAddPhotoOpen}
          onClose={() => setIsAddPhotoOpen(false)}
        />
      </Card>
    );
  }

  const buttonClassName =
    "absolute top-1/2 -translate-y-1/2 bg-secondary opacity-30 hover:opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all cursor-pointer";

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Vehicle Photos ({photos.length})</h3>
          </div>
          {!readOnly && (
            <Button
              variant="outline"
              className="gap-2 h-8 px-3"
              onClick={() => setIsAddPhotoOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Photos
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {photos.map((photo, photoIndex) => (
                <div
                  key={photo._id}
                  className="mr-2 min-w-0 min-h-[200px] md:flex-[0_0_calc(30%-0.75rem)] sm:flex-[0_0_calc(50%-0.5rem)] xs:flex-[0_0_100%]"
                >
                  <div className="relative w-full h-full aspect-video bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                    <Image
                      fill
                      src={photo.url}
                      alt={photo.title || "Vehicle photo"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    <button
                      type="button"
                      className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-200 flex items-center justify-center"
                      onClick={() => handlePhotoClick(photoIndex)}
                    >
                      <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>

                    <div
                      role="toolbar"
                      aria-label="Photo actions"
                      className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 translate-y-[100%] group-hover:translate-y-0 transition-transform"
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      {editingPhotoId === photo._id ? (
                        <div className="flex items-center gap-1">
                          <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="h-6 text-xs bg-white text-black px-1 py-0"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleTitleSave(e);
                              if (e.key === "Escape") handleTitleCancel(e);
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleTitleSave}
                            className="text-green-400 hover:text-green-300"
                          >
                            <ZoomIn className="h-4 w-4 rotate-45" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between group/title">
                          <p className="text-xs truncate flex-1">
                            {photo.title || "Untitled"}
                          </p>
                          {!readOnly && (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={(e) => handleEditClick(e, photo)}
                                className="opacity-0 group-hover/title:opacity-100 text-gray-300 hover:text-white transition-opacity"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDeleteClick(e, photo)}
                                className="opacity-0 group-hover/title:opacity-100 text-gray-300 hover:text-white transition-opacity"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {photos.length > 4 && (
            <>
              <button
                type="button"
                className={cn(buttonClassName, "left-0")}
                onClick={scrollPrev}
                aria-label="Previous photos"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={cn(buttonClassName, "right-0")}
                onClick={scrollNext}
                aria-label="Next photos"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </CardContent>

      <PhotoModal
        photos={photos}
        initialIndex={modalPhotoIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <AddPhotoDialog
        appraisalId={appraisalId}
        isOpen={isAddPhotoOpen}
        onClose={() => setIsAddPhotoOpen(false)}
      />
    </Card>
  );
}
