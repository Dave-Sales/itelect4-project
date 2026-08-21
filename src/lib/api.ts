import type { Claim, Item, User } from "../types/index";

const API_BASE = "http://localhost:3001";

export type ClaimInput = {
  itemId: number;
  claimedByUserId: number;
  notes?: string;
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchUsers(): Promise<User[]> {
  return fetchJson<User[]>("/users");
}

export async function fetchItems(): Promise<Item[]> {
  return fetchJson<Item[]>("/items");
}

export async function fetchClaims(): Promise<Claim[]> {
  return fetchJson<Claim[]>("/claims");
}

export async function createClaim(input: ClaimInput): Promise<Claim> {
  const payload = {
    ...input,
    claimedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_BASE}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create claim.");
  }

  return (await response.json()) as Claim;
}
