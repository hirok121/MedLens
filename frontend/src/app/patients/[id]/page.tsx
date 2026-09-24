"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, UserRound, Loader2 } from "lucide-react";
import { getPatient, type Patient } from "@/lib/api";

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params
      .then(({ id }) => getPatient(id))
      .then(setPatient)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load patient.")
      )
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-clinical-600"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={16} className="animate-spin" />
          Loading patient…
        </div>
      )}

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {patient && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clinical-50 text-clinical-600">
              <UserRound size={26} />
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {patient.name}
              </h1>
              <p className="text-sm text-slate-500">Patient Case</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Age
              </dt>
              <dd className="mt-1 text-sm text-slate-900">{patient.age}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Gender
              </dt>
              <dd className="mt-1 text-sm text-slate-900">
                {patient.gender}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Patient ID
              </dt>
              <dd className="mt-1 break-all text-sm text-slate-900">
                {patient.id}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Created
              </dt>
              <dd className="mt-1 text-sm text-slate-900">
                {new Date(patient.created_at).toLocaleString()}
              </dd>
            </div>
          </dl>

          <p className="mt-6 rounded-md bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Medical history, symptoms, and test results will appear here in a
            future version of MedLens.
          </p>
        </div>
      )}
    </div>
  );
}
