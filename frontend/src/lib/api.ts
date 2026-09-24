/**
 * Minimal API client for talking to the MedLens FastAPI backend.
 *
 * Uses NEXT_PUBLIC_API_URL for the backend base URL. Keep this file the
 * single place that knows about fetch/base-URL details so routes and
 * components stay simple.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  created_at: string;
}

export interface CreatePatientInput {
  name: string;
  age: number;
  gender: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Request to ${path} failed (${res.status}): ${detail}`);
  }

  return res.json() as Promise<T>;
}

export function getHealth() {
  return request<{ status: string; service: string }>("/health");
}

export function getPatients() {
  return request<Patient[]>("/api/patients");
}

export function getPatient(id: string) {
  return request<Patient>(`/api/patients/${id}`);
}

export function createPatient(input: CreatePatientInput) {
  return request<Patient>("/api/patients", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function sendAiTestPrompt(prompt: string) {
  return request<{ response: string }>("/api/ai/test", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}
