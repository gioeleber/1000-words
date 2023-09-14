function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}

// 👇️ 2023-09-14 (YYYY-MM-DD)
export function formatDate(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}
