function formatTime(t) {
  const hours = Math.floor(t / 3600);
  const minutes = Math.floor((t % 3600) / 60);
  const seconds = t % 60;

  const formattedHours =
    hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
  const formattedMinutes = `${minutes.toString().padStart(2, "0")}:`;
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return formattedHours + formattedMinutes + formattedSeconds;
}

export { formatTime };
