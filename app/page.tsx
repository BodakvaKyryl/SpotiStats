"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home(): void {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
}
