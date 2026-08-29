import Cookies from "js-cookie";
import { COOKIE_EXPIRES_DAYS, COOKIE_KEYS } from "@/constants/cookies";
import type { AuthUser, JwtResponse } from "@/types/auth";

const cookieOptions = {
  expires: COOKIE_EXPIRES_DAYS,
  sameSite: "lax" as const,
  path: "/",
};

export function persistAuth(auth: JwtResponse): AuthUser {
  const user: AuthUser = {
    id: auth.id,
    username: auth.username,
    email: auth.email,
    roles: auth.roles,
  };

  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, auth.accessToken, cookieOptions);
  Cookies.set(COOKIE_KEYS.ROLE, auth.roles.join(","), cookieOptions);
  Cookies.set(COOKIE_KEYS.USER, JSON.stringify(user), cookieOptions);

  return user;
}

export function clearAuth() {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN, { path: "/" });
  Cookies.remove(COOKIE_KEYS.ROLE, { path: "/" });
  Cookies.remove(COOKIE_KEYS.USER, { path: "/" });
}

export function getAccessToken(): string | undefined {
  return Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
}

export function getStoredUser(): AuthUser | null {
  const raw = Cookies.get(COOKIE_KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}
