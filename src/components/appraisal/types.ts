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
  driveAwayPrice: number;
  kms: number;
  listingSources: string[];
  color: string;
}

export interface PhotoData {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}
