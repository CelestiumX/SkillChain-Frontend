import { ContractForm } from "@/components/contract/contract-form"

export default function CreateContractPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-electric-blue mb-6">Create Service Contract</h1>
      <ContractForm />
    </div>
  )
}
