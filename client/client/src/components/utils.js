export function daysAgo(dateString) {
    const givenDate = new Date(dateString);
    const today = new Date();
  
    const differenceInMs = today - givenDate;
  
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

 export function getTimeHHMM(dateString) {
    const date = new Date(dateString);
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }