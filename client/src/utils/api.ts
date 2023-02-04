const API_BASE_URL = import.meta.env.VITE_API_URL;

async function fetchApi<T>(path: `/${string}`, init?: RequestInit) {
  try {
    const response = await fetch(API_BASE_URL + path, init);
    return (await response.json()) as T;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function sendEmail(data: EmailData) {
  return fetchApi<{ success: boolean }>("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}
