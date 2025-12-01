import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LISTING_SOURCES, type ListingSource } from "./constants";

/**
 * Combines class names using clsx and tailwind-merge
 * This utility merges Tailwind CSS classes intelligently, removing conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount?: number | null) => {
  if (amount == null) return "N/A";

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (dateString?: string | null) => {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatKms = (kms?: number | null) => {
  if (kms == null) return "N/A";

  return `${kms.toLocaleString()} km`;
};

export const mapListingSource = (source: ListingSource) => {
  return LISTING_SOURCES[source] || source;
};
