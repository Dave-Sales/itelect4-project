import type { User, Item, StringOrNumber, ApiResponse } from "./types/index";
import type { UserUpdate, UserPreview, PublicUser, RoleCount } from "./types/index";
import { ClaimStatus, Role } from "./types/index";

export default function App() {

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "Campus Lost & Found Tracker";
const currentYear: number = 2026;
const isActiveTracker: boolean = true;
const nullValue: null = null;
const undefinedValue: undefined = undefined;

console.log("Tracker flags:", { isActiveTracker, nullValue, undefinedValue });

function greetTracker(systemName: string, year: number): string {
  return `Welcome to ${systemName} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage(greetTracker(projectName, currentYear));

// ===== USING INTERFACES =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const lostItem: Item = {
  id: 101,
  title: "Blue Hydro Flask Water Bottle",
  category: "Personal Items",
  locationFound: "Library 2nd Floor",
  isResolved: false,
};

console.log("Registered User:", student);
console.log("Logged Lost Item:", lostItem);

// ===== TYPE NARROWING =====
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}

console.log("Narrowed String (Category):", processInput("electronics"));
console.log("Narrowed Number (Item ID):", processInput(101.456));
console.log("Narrowed Date (Claim Date):", formatDate(new Date()));

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const firstItem = getFirst<Item>([lostItem]);
const foundItem = getById<Item>([lostItem], 101);

console.log("First Item Title:", firstItem?.title);
console.log("Found Item Location:", foundItem?.locationFound);

// ===== GENERIC INTERFACE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};

const itemResponse: ApiResponse<Item[]> = {
  success: true,
  data: [lostItem],
};

console.log("API Response User Name:", userResponse.data.name);
console.log("API Response Item Count:", itemResponse.data.length);

// ===== USING UTILITY TYPES =====
const patch: UserUpdate = { name: "Juan D. Cruz" };
const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" };
const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student" };
const roleCount: RoleCount = { student: 120, security_admin: 4 };

console.log("User Patch Payload:", patch);
console.log("User Preview:", preview);
console.log("Public User Profile:", publicProfile);
console.log("Role Counts:", roleCount);

// ===== ReturnType<T> =====
function createClaim(itemId: number, claimedByUserId: number) {
  return {
    id: 1,
    itemId,
    claimedByUserId,
    claimedAt: new Date(),
    notes: "Identified distinct sticker on bottle base",
  };
}

type NewClaim = ReturnType<typeof createClaim>;
const userClaim: NewClaim = createClaim(101, 1);
console.log("Inferred New Claim:", userClaim);

// ===== USING ENUMS =====
let currentClaimStatus: ClaimStatus = ClaimStatus.Pending;
console.log("Current Claim Status:", currentClaimStatus);

currentClaimStatus = ClaimStatus.Verified;
console.log("Is Claim Verified?:", currentClaimStatus === ClaimStatus.Verified);

const currentRole: Role = Role.Student;
console.log("Role Value:", currentRole);

  return null;
}