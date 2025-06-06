"use client";

import React from "react";
import { useModelContext } from "../../context/Context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AdminWrapper({ children, documentId }) {
  const { email } = useModelContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (email) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("email", email);
      router.replace(`/constitution/${documentId}?${params.toString()}`);
    }
  }, [email, documentId, router, searchParams]);

  return <>{children}</>;
}
