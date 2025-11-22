export function areKeysEmpty(
  payload: Record<string, any>,
  exempt: string[] = []
): boolean {
  return Object.entries(payload).every(([key, value]) =>
    exempt.includes(key)
      ? true
      : !(
          value === null ||
          value === undefined ||
          (typeof value == "string" && value.trim() === "")
        )
  );
}
