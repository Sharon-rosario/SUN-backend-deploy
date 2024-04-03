const formatTime = (inputTime) => {
    // Check if the input is already in 24-hour format (e.g., "14:00")
    const regex24HourFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (regex24HourFormat.test(inputTime)) {
      return inputTime; // Already in 24-hour format
    }
  
    // Check for 12-hour format and convert (e.g., "2:00 PM")
    const regex12HourFormat = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?(AM|PM)$/i;
    const match = inputTime.match(regex12HourFormat);
  
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = match[2];
      const ampm = match[3].toUpperCase();
  
      if (ampm === "PM" && hours < 12) {
        hours += 12; // Convert PM to 24-hour format
      } else if (ampm === "AM" && hours === 12) {
        hours = 0; // Convert 12 AM to 00
      }
  
      // Ensure hours are two digits
      const formattedHours = hours.toString().padStart(2, '0');
      return `${formattedHours}:${minutes}`;
    }
  
    // If the input format is not recognized, return an error message or the original input
    console.warn("Time format not recognized:", inputTime);
    return inputTime; // Or return an error/notification as needed
  };
  
  module.exports = formatTime;
  