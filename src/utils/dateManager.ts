export const transformDate = (input: string) => {
  // Split the input string into start and end dates
  const [start, end] = input.split(' - ');
  // Remove the "(1d)" part from the end date
  const endDate = `${end?.split(' ')[0]} ${end?.split(' ')[1]}`

  // Parse the start and end dates into Date objects
  const startDate = new Date(start);
  const finalEndDate = new Date(endDate);

  // Set the year of startDate and finalEndDate to the current year
  const currentYear = new Date().getFullYear();
  startDate.setFullYear(currentYear);
  finalEndDate.setFullYear(currentYear);

  return [startDate, finalEndDate];
}