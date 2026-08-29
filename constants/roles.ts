import type { Role } from "@/types/auth";

export const ROLES = {
  USER: "ROLE_USER",
  TEACHER: "ROLE_TEACHER",
  ADMIN: "ROLE_ADMIN",
} as const satisfies Record<string, Role>;
