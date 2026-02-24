export type ListingSource =
  | "autograb.com.au"
  | "autotrader.com.au"
  | "carsales.com.au"
  | "carsforsale.com.au"
  | "drive.com.au"
  | "facebook.com.au"
  | "gumtree.com.au"
  | "onlycars.com.au"
  | "shopforcars.com.au"
  | "carsforcomm-bank.com.au";

export const LISTING_SOURCES: Record<ListingSource, string> = {
  "autograb.com.au": "autograb",
  "autotrader.com.au": "autotrader",
  "carsales.com.au": "carsales",
  "carsforsale.com.au": "carsforsale",
  "drive.com.au": "drive",
  "facebook.com.au": "facebook",
  "gumtree.com.au": "gumtree",
  "onlycars.com.au": "onlycars",
  "shopforcars.com.au": "shopforcars",
  "carsforcomm-bank.com.au": "carsforcomm-bank",
};

// Lead filter constants
export const DAYS_FILTER_OPTIONS = [30, 60, 90, 180, 360] as const;

export const SELLER_TYPE_OPTIONS = [
  "All",
  "P/D",
  "Private",
  "Dealer",
  "New",
] as const;

export const AUSTRALIAN_STATES = [
  { value: "QLD", label: "Queensland" },
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" },
] as const;
