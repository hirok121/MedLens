import Link from "next/link";
import { ActivitySquare, ClipboardList, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: ClipboardList,
    title: "Patient Cases",
    description:
      "Organize patient records in one place, ready to grow into full clinical case tracking.",
  },
  {
    icon: ActivitySquare,
    title: "Clinical Foundation",
    description:
      "A structured base for symptoms, history, and test results as the platform expands.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Extend",
    description:
      "Designed for future AI-assisted differential diagnosis and evidence-backed review.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <section className="text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-clinical-500">
          MedLens
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          An AI-powered clinical decision-support assistant
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          MedLens will help doctors evaluate patient cases by analyzing
          medical history, current symptoms, clinical findings, and test
          results. This is the initial foundation of the platform.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-clinical-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clinical-600"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/ai-test"
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            AI Integration Test
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-6 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-clinical-50 text-clinical-600">
              <Icon size={20} />
            </span>
            <h3 className="text-base font-semibold text-slate-900">
              {title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
