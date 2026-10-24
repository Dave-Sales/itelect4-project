// src/types/index.ts

// ===== CORE ENTITIES =====
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export type UserRole = "student" | "security_admin";

export interface Item {
  id: string;
  title: string;
  category: string;
  locationFound: string;
  isResolved: boolean;
}

export interface Claim {
  id: string;
  itemId: string;
  claimedByUserId: string;
  claimedAt: Date;
  notes?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: "ready" | "almost" | "not-yet";
}

// ===== TYPE ALIASES & UNIONS =====
export type StringOrNumber = string | number;

// ===== GENERICS =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<"student" | "security_admin", number>;

// ===== ENUMS =====
// Multi-step lifecycle values for claims
export const ClaimStatus = {
  Pending: "Pending",
  Verified: "Verified",
  Rejected: "Rejected",
} as const;

export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus];

// Role configuration
export const Role = {
  Student: "student",
  SecurityAdmin: "security_admin",
} as const;

export type Role = (typeof Role)[keyof typeof Role];