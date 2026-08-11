// ============================================================
// LuxeSpace — Unified Type Definitions
// Single source of truth for all shared interfaces.
// Import from here instead of redefining locally.
// ============================================================

// ------ Auth ------------------------------------------------

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role?: "buyer" | "seller" | "admin";
}

// ------ Seller (nested on Property) ------------------------

export interface Seller {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

// ------ Property (matches Express GET /api/property/:id) ---
// The API returns `sellerId` + nested `seller` object.
// `image` is nullable in the DB (String?) so we allow null here.

export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description?: string | null;
  image?: string | null;
  status: string;
  dateUploaded?: string;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  seller?: Seller;
  buyerId?: string | null;
}

// ------ Booking / PaymentProperty --------------------------
// Matches the `Booking` Prisma model returned by the Express server.

export interface Booking {
  id: string;
  sessionId: string;
  propertyId: string;
  title: string;
  price: number;
  type: string;
  location: string;
  image?: string | null;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// `PaymentProperty` is the shape used by dashboard components
// to display booked/sold properties. It is a subset of Booking.
export type PaymentProperty = Booking;

// ------ Admin / Formatted types ----------------------------

export interface FormattedProperty {
  price: number;
  status: string;
  type: string;
}

export interface FormattedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// ------ Seller Dashboard types -----------------------------

export interface SoldProperty {
  id: string;
  title: string;
  price: number;
  type: string;
  location: string;
  image?: string | null;
  buyerName: string;
  buyerEmail: string;
  createdAt: string;
}

export interface AllProperty {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  status: string;
  image?: string | null;
}
