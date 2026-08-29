import type { Metadata } from "next";
import RequireRole from "@/components/auth/RequireRole";
import DashboardShell from "./components/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard | Learn English",
};

export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
  return (
    <RequireRole>
      <DashboardShell>{props.children}</DashboardShell>
    </RequireRole>
  );
}
