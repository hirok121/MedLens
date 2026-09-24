import { PatientList } from "@/components/PatientList";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Overview of patient cases in MedLens.
        </p>
      </div>

      <PatientList />
    </div>
  );
}
