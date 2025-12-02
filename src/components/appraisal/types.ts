import { Appraisal } from "@/hooks/useAppraisals";

export interface AppraisalFormData {
  // Vehicle editable fields
  lastOdometer: number;
  managerMaxOffer: number;

  // Reconditioning fields
  detail: string;
  paintPanel: string;
  rwc: string;
  registration: string;
}

export interface VehicleData {
  _id: string;
  description: string;
  rego: string;
  vin: string;
  colour: string;
  make: string;
  model: string;
  modelId: string;
  odometer: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeadData {
  _id: string;
  externalId: string;
  modelId: string;
  listedAt: string;
  removedAt: string;
  sellerType: string;
  state: string;
  priceBeforeGovtCharges: number;
  driveAwayPrice: number;
  kms: number;
  listingSources: string[];
  color: string;
}

export interface PhotoData {
  _id: string;
  url: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
}
