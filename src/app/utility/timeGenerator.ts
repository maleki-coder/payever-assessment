export function generateHourSlotsWithAmPm(): string[] {
    const hourSlots: string[] = [];
  
    for (let hour = 0; hour < 24; hour++) {
      // for (let minutes = 0; minutes < 60; minutes += 15) {
        const period = hour < 12 ? 'AM' : 'PM'; // Determine AM or PM
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert 0 and 24 to 12 for 12-hour format
        // const formattedMinutes = String(minutes).padStart(2, '0'); // Format minutes as "MM"
        hourSlots.push(`${formattedHour} ${period}`);
      // }
    }
  
    return hourSlots;
  }
export function generateMinuteSlots(): string[] {
    const minSlots: string[] = [];
  
    // for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        // const period = hour < 12 ? 'AM' : 'PM'; // Determine AM or PM
        // const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert 0 and 24 to 12 for 12-hour format
        const formattedMinutes = String(minutes).padStart(2, '0'); // Format minutes as "MM"
        minSlots.push(`${formattedMinutes}`);
      }
    // }
  
    return minSlots;
  }
  