import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourOnly',
  standalone: true,
})
export class HourOnlyPipe implements PipeTransform {
  transform(timeSlots: string[]): string[] {
    const uniqueHours = new Set<string>();

    // Iterate over time slots, split them, and only keep the unique hours
    timeSlots.forEach((timeSlot) => {
      const [time, period] = timeSlot.split(' ');
      const [hour] = time.split(':');
      uniqueHours.add(`${parseInt(hour, 10)} ${period}`); // Add formatted hour to the set
    });

    return Array.from(uniqueHours); // Return the unique hours as an array
  }
}
