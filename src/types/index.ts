// src/types/index.ts

// ===== CORE ENTITIES =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "security_admin";
  isActive: boolean;
}

export interface Item {
  id: number;
  title: string;
  category: string;
  locationFound: string;
  isResolved: boolean;
}

export interface Claim {
  id: number;
  itemId: number;
  claimedByUserId: number;
  claimedAt: Date;
  notes?: string;
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