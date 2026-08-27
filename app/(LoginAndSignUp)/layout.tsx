"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/User/HomePage')
      } else {
        setLoading(false);
      }
    });
    return () => unSubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-20 h-20 border border-blue-500 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedAuth;