import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to marketplace by default
  redirect("/dashboard/marketplace")
}
