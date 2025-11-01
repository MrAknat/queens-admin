"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Camera, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { PhotoModal } from "./PhotoModal";
import type { PhotoData } from "./types";

interface PhotoCarouselProps {
  photos: PhotoData[];
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
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
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);

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

  if (!photos || photos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Vehicle Photos</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
            <Camera className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500">No photos available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const buttonClassName =
    "absolute top-1/2 -translate-y-1/2 bg-secondary opacity-30 hover:opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all cursor-pointer";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Vehicle Photos ({photos.length})</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {photos.map((photo, photoIndex) => (
                <div
                  key={photo.id}
                  className="min-w-0 md:flex-[0_0_calc(30%-0.75rem)] sm:flex-[0_0_calc(50%-0.5rem)] xs:flex-[0_0_100%]"
                >
                  <button
                    type="button"
                    className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mr-2 group cursor-pointer"
                    onClick={() => handlePhotoClick(photoIndex)}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Hover overlay with zoom icon */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-200 flex items-center justify-center">
                      <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>

                    {/* Caption */}
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black opacity-90 text-white p-2 group-hover:translate-y-[100%] transition-transform">
                        <p className="text-xs">{photo.caption}</p>
                      </div>
                    )}
                  </button>
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

      {/* Photo Modal */}
      <PhotoModal
        photos={photos}
        initialIndex={modalPhotoIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Card>
  );
}
