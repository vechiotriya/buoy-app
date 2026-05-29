/**
 * Takes a date string and returns a string in the format "day month", e.g. "15 June"
 * @param {string} dateString - The date string to be processed
 * @returns {string} - The formatted date string
 */
export const dayMonthExtractor: Function = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate() + " " + date.toLocaleString("default", { month: "long" })}`;
};

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Trim all fields of an object to remove any leading and trailing whitespace.
 * @throws {Error} If the object is null or if the value of any key is null or not a string.
 * @param {typeof obj} obj - The object to have its fields trimmed.
 * @returns {typeof obj} - The object with its fields trimmed.
 */
export const trimFields = (obj: any): typeof obj => {
  if (obj === null) {
    throw new Error("Cannot trim fields of null object");
  }
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (v === null || typeof v !== "string") {
        throw new Error(`Value of key ${k} is null or not a string`);
      }
      return [k, v.trim()];
    }),
  ) as typeof obj;
};

/**
 * Returns a color from the given array based on the hash of the given categoryId.
 * The color is determined by taking the hash of the categoryId modulo the length of the colors array.
 * This ensures that the same categoryId will always return the same color.
 * @param {string[]} colors - The array of colors to choose from.
 * @param {string} categoryId - The categoryId to determine the color for.
 * @returns {string} - The color chosen based on the categoryId.
 */
export function getCategoryColor(colors: string[], categoryId: string) {
  return colors[hashString(String(categoryId)) % colors.length];
}

/**
 * Returns date in YYYY-MM-DD format based on the given date for how buoy backend wants it.
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date.
 */
export const createDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
}
