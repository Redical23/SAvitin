"use client"

import type React from "react"
import AdminWrapper from "./admin-wrapper"

interface ClientPageProps {
  children: React.ReactNode
  documentId: string
}

export default function ClientPage({ children, documentId }: ClientPageProps) {
  return <AdminWrapper documentId={documentId}>{children}</AdminWrapper>
}
