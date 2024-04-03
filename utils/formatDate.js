const { formatISO, parseISO } = require("date-fns");

const formatDate = (inputDate) => {
    let formattedDate;
    if (inputDate.includes('/')) {
      // Assuming the input format is DD/MM/YYYY
      const [day, month, year] = inputDate.split('/');
      // formattedDate = formatISO(new Date(year, month - 1, day));
      formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else if (inputDate.includes('T') && inputDate.endsWith('Z')) {
      // If the date is already in ISO format
      formattedDate = inputDate;
    } else {
      // For any other format, attempt to parse directly (might need adjustments based on expected inputs)
      formattedDate = formatISO(parseISO(inputDate));
    }
    return formattedDate;
  };
  
  module.exports = formatDate