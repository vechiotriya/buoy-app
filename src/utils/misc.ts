export const dayMonthExtractor: Function = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()+' '+date.toLocaleString('default', { month: 'long' })}`;
};

function hashString(str:string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getCategoryColor(colors: string[], categoryId:string) { return colors[hashString(String(categoryId)) % colors.length]; }
