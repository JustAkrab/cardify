import { Sidebar } from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

export default function DashLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <Sidebar />
      <div className="pl-72 pt-12 w-full min-h-screen">{children}</div>
    </div>
  );
}
