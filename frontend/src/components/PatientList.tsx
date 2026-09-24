"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound, Plus, Loader2 } from "lucide-react";
import { createPatient, getPatients, type Patient } from "@/lib/api";

const TEST_NAMES = ["Alex Morgan", "Jordan Lee", "Sam Rivera", "Casey Chen"];
const TEST_GENDERS = ["Female", "Male", "Non-binary"];

function randomTestPatient() {
  return {
    name: TEST_NAMES[Math.floor(Math.random() * TEST_NAMES.length)],
    age: 20 + Math.floor(Math.random() * 60),
    gender: TEST_GENDERS[Math.floor(Math.random() * TEST_GENDERS.length)],
  };
}

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadPatients() {
    try {
      const data = await getPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load patients."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Standard fetch-on-mount pattern: all state updates inside loadPatients
    // happen after an `await`, never synchronously within this effect body.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPatients();
  }, []);

  async function handleCreateTestPatient() {
    setCreating(true);
    try {
      await createPatient(randomTestPatient());
      setError(null);
      setLoading(true);
      await loadPatients();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create patient."
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Patient Cases
        </h2>
        <button
          onClick={handleCreateTestPatient}
          disabled={creating}
          className="flex items-center gap-2 rounded-md bg-clinical-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clinical-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {creating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          Create Test Patient
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
            <Loader2 size={16} className="animate-spin" />
            Loading patients…
          </div>
        ) : patients.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">
            No patients yet. Create a test patient to get started.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {patients.map((patient) => (
              <li key={patient.id}>
                <Link
                  href={`/patients/${patient.id}`}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clinical-50 text-clinical-600">
                    <UserRound size={18} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-slate-900">
                      {patient.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {patient.age} yrs · {patient.gender}
                    </span>
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(patient.created_at).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
