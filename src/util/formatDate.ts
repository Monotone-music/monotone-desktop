function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${month}-${year}`;
}

export default formatMonthYear;
