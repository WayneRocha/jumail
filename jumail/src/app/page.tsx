import { Header } from "@/components/Header"
import AppContent from "./AppContent"

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col">
      <Header />
      <AppContent />
    </main>
  )
}


