export function formatLabel(str: string) {
  return str
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (s) => s.toUpperCase()); // Capitalize first letter
}
