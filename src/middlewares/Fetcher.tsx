export const BASE_URL = "http://localhost:8000/api";

export const fetcher = (url: string) =>
  fetch(`${BASE_URL}${url}`).then((res) => res.json());
