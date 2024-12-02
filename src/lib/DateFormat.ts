export const formatToWIB = (isoString: string): string => {
  const date = new Date(isoString);
  // Indonesia is UTC+7
  const offset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  const localTime = new Date(date.getTime() + offset);

  // Mapping bulan ke nama pendek
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  // Format tanggal
  const day = String(localTime.getDate()).padStart(2, "0");
  const month = months[localTime.getMonth()];
  const year = localTime.getFullYear();

  // Format waktu
  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
};
