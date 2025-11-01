"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
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

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  // Calculate number of pages based on 3 photos per viewport
  const totalPages = Math.ceil(photos.length / 3);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

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
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="min-w-0 md:flex-[0_0_calc(30%-0.75rem)] sm:flex-[0_0_calc(50%-0.5rem)] xs:flex-[0_0_100%]"
                >
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mr-2 group">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 group-hover:translate-y-[100%] transition-transform">
                        <p className="text-xs">{photo.caption}</p>
                      </div>
                    )}
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
    </Card>
  );
}
