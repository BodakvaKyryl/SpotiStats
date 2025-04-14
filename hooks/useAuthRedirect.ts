"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PROTECTED_ROUTES = ["/home", "/songs", "/albums", "/artists", "/genres"];

export function useAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === "loading" || isRedirecting) return;

    const isAuthenticated = !!session?.accessToken;
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname?.startsWith(route));

    if (!isAuthenticated && isProtectedRoute) {
      setIsRedirecting(true);
      router.push("/login");
    }
  }, [session, status, router, pathname, isRedirecting]);

  return {
    isAuthenticated: !!session?.accessToken,
    isLoading: status === "loading",
    user: session?.user,
  };
}
