const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`GET ${path} failed with ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function apiPost<TBody, TResponse>(
  path: string,
  body: TBody,
  init?: RequestInit,
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`POST ${path} failed with ${res.status}`);
  }

  return (await res.json()) as TResponse;
}

export async function apiPatch<TBody, TResponse>(
  path: string,
  body: TBody,
  init?: RequestInit,
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`PATCH ${path} failed with ${res.status}`);
  }

  return (await res.json()) as TResponse;
}

export async function apiDelete<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`DELETE ${path} failed with ${res.status}`);
  }

  return (await res.json()) as T;
}
