'use client'

import { Header } from "@/components/Header"
import AppContent from "./AppContent"
import { Loading } from "@/components/Loading"
import { useEffect, useState } from "react"

export default function Home() {
  const [ clientSide, setClientSide ] = useState<boolean>(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return (
    <main className="flex h-screen w-screen flex-col">
      <Header />
      {
        clientSide ? (
          <AppContent/>
        ) : (
          <Loading />
        )
      }
    </main>
  )
}


