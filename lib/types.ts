/**
 * Mechelin Metals Product Type Definitions
 * Following the requested MongoDB Schema
 */

export interface ProductSpecs {
  grade?: string;
  form?: string;
  purity?: string;
  source?: string;
  hazardCompliance?: string;
  zincContent?: string;
}

export interface ProductMOQ {
  value: number;
  unit: "kg" | "tonne";
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface Product {
  _id: string; // Used for unique references in edit lists
  title: string;
  slug: string;
  description: string;
  category: ProductCategory;
  badge?: string; // e.g., "Highly Pure", "Industrial Grade", "Best Seller"
  specs: ProductSpecs;
  moq: ProductMOQ;
  applications: string[];
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const CATEGORIES: ProductCategory[] = [
  { name: "Aluminum", slug: "aluminum" },
  { name: "Copper", slug: "copper" },
  { name: "Brass", slug: "brass" },
  { name: "Lead", slug: "lead" },
  { name: "Battery", slug: "battery" },
];

export interface DashboardMetric {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  description: string;
}

export interface Inquiry {
  _id: string;
  productTitle: string;
  productSlug: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  quantityRequested: number;
  quantityUnit: string;
  inquiryType: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  _id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  type?: string;
  product?: string;
  volume?: string;
  message: string;
  channel: string;
  createdAt?: string;
  updatedAt?: string;
}

// export interface IInquiry {
//   productTitle: string;
//   productSlug: string;
//   companyName: string;
//   contactName: string;
//   contactEmail: string;
//   quantityRequested: number;
//   quantityUnit: string;
//   inquiryType: string;
//   notes?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface AnalyticsData {
  month: string;
  pageViews: number;
  inquiries: number;
  sampleRequests: number;
}

export const BADGE_OPTIONS = [
  "Recyclable Scrap",
  "Premium Export Grade",
  "High Purity Export Grade",
  "Industrial Recycling Grade",
  "Architectural Export Grade",
  "Premium Alloy Grade",
  "Heavy Cast Export Grade",
] as const;

export const GRADE_OPTIONS = [
  "Mixed Aluminum Scrap Grade",
  "UBC Export Grade",
  "Offset Lithographic Aluminium Scrap",
  "Mixed Hermetic Compressor Scrap",
  "Cast Aluminium Alloy Wheel Scrap",
  "Heavy Cast Aluminium Scrap",
  "Extruded Aluminium Profile Scrap"
] as const;

export const FORM_OPTIONS = [
  "Compressed Bundle",
  "Compressed Baled Scrap",
  "Flat Stacked Sheets",
  "Complete Sealed Compressors",
  "Complete Cast Wheel Rims",
  "Mixed Heavy Cast Components",
  "Mixed Aluminium Extrusion Profiles"
] as const;

export const PURITY_OPTIONS = [
  "92–98% Aluminium (Typical)",
  "95–99% Aluminium Recovery",
  "98–99.5% Aluminium",
  "Mixed Ferrous & Non-Ferrous Metal Composition",
  "95–98% Aluminium Alloy",
  "92–98% Aluminium Alloy",
  "95–99% Aluminium Alloy",
] as const;

export const ZINC_CONTENT_OPTIONS = [
  "<0.5%",
  "<0.05%",
  "<0.03%",
  "N/A (Copper Recovery: 8–18%)",
  "0.5–3.5% (Depending on Alloy Grade)",
  "0.5–4.0% (Varies by Alloy Composition)",
  "<1.0% (Varies by Alloy Grade)"
] as const;

export const SOURCE_OPTIONS = [
  "Post-Consumer & Industrial Recycling",
  "Post-Consumer Beverage Can Recycling",
  "Commercial Printing & Packaging Industry",
  "Refrigerators, Freezers & Air Conditioning Systems",
  "Motorcycles, Scooters & Three-Wheel Vehicles",
  "Automotive Engines, Industrial Machinery & Engineering Equipment",
  "Construction, Demolition & Industrial Fabrication",
] as const;

export const HAZARD_OPTIONS = [
  "Non-Hazardous Recyclable Metal Scrap (ADR/GHS)",
  "Non-Hazardous Recyclable Metal Scrap",
  "Non-Hazardous Recyclable Industrial Scrap (Refrigerants Removed Prior to Export)",
  
] as const;


export interface ProductFormData {
  title: string;
  slug: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  badge: string;
  badgeOption: string;
  moqValue: number;
  moqUnit: "kg" | "tonne";
  specs: {
    grade: string;
    form: string;
    purity: string;
    zincContent: string;
    source: string;
    hazardCompliance: string;
  };
  applications: string[];
  images: string[];
}

export const defaultFormData: ProductFormData = {
  title: "",
  slug: "",
  description: "",
  categorySlug: CATEGORIES[0].slug,
  categoryName: CATEGORIES[0].name,
  badge: "",
  badgeOption: "",
  moqValue: 50,
  moqUnit: "tonne",
  specs: {
    grade: "",
    form: "",
    purity: "",
    zincContent: "",
    source: "",
    hazardCompliance: "",
  },
  applications: [],
  images: [],
};

export const buildSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

export const getFormDataFromProduct = (product: Product): ProductFormData => ({
  title: product.title,
  slug: product.slug,
  description: product.description,
  categorySlug: product.category.slug,
  categoryName: product.category.name,
  badge: product.badge ?? "",
  badgeOption: product.badge
    ? (BADGE_OPTIONS.includes(product.badge as typeof BADGE_OPTIONS[number]) ? product.badge : "Custom")
    : "",
  moqValue: product.moq.value,
  moqUnit: product.moq.unit,
  specs: {
    grade: product.specs.grade ?? "",
    form: product.specs.form ?? "",
    purity: product.specs.purity ?? "",
    zincContent: product.specs.zincContent ?? "",
    source: product.specs.source ?? "",
    hazardCompliance: product.specs.hazardCompliance ?? "",
  },
  applications: product.applications ?? [],
  images: product.images ?? [],
});


