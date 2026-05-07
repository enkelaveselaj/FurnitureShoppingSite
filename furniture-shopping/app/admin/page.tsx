"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
    
    if (session.user?.role !== "admin") {
      router.push("/");
      return;
    }

    // Redirect to admin products page
    router.push("/admin/products");
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to admin dashboard...</p>
      </div>
    </div>
  );
}
