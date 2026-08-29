"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types/auth";

export default function RequireRole({
  allowedRoles,
  children,
}: {
  allowedRoles?: Role[];
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const isAllowed =
    !!user &&
    (!allowedRoles || allowedRoles.some((role) => user.roles.includes(role)));

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }
    if (!isAllowed) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isLoading, user, isAllowed, router]);

  if (isLoading || !isAllowed) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
