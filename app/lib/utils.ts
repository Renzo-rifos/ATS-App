
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Converts a byte count into a human-readable string (e.g. 2097152 → "2.0 MB")
export const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const units = ["Bytes", "KB", "MB", "GB"]

  // log base 1024 of bytes → tells us which unit to use
  // e.g. 1024 → 1 (KB), 1048576 → 2 (MB), 1073741824 → 3 (GB)
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  // divide by 1024^i to convert to the target unit, then round to 1 decimal
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}
//generate a random UUID
export const generateUUID = () => crypto.randomUUID()