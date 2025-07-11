import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function splitOutsideParentheses(input: string): string[] {
  const result: string[] = []
  let current = ""
  let depth = 0

  for (let char of input) {
    if (char === "," && depth === 0) {
      result.push(current.trim())
      current = ""
    } else {
      if (char === "(") depth++
      if (char === ")") depth--
      current += char
    }
  }

  if (current) result.push(current.trim())
  return result
}
