import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSecureFourDigit() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % 9000 + 1000;  // Restricts the result to 4 digits
}
