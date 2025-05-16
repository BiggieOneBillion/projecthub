// api.ts
import axios from "axios";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await axios.get(url);
  return res.data;
}
