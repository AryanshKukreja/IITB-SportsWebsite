// // utils.ts

// import { Slot } from './types';

// export const generateCustomSlots = (): Slot[] => {
//   const slots: Slot[] = [];
//   const currentDate = new Date();
//   const nextDate = new Date(currentDate);
//   nextDate.setDate(currentDate.getDate() + 1);

  // const createSlot = (date: Date, hour: number, minute: number, duration: number): Slot => {
//     const startTime = new Date(date);
//     startTime.setHours(hour, minute, 0, 0);

//     const endTime = new Date(startTime);
//     endTime.setMinutes(startTime.getMinutes() + duration);

//     const time = `${startTime.toISOString()} - ${endTime.toISOString()}`;

//     // Note: Explicitly setting status as 'available'
//     return {
//       id: slots.length + 1,
//       time,
//       status: 'available', // Explicitly define the allowed status
//     };
//   };

//   // Create slots for today
//   for (let hour = 6; hour < 15; hour++) {
//     slots.push(createSlot(currentDate, hour, 30, 60)); // 6:30 AM to 9:30 AM (1-hour slots)
//   }

//   slots.push(createSlot(currentDate, 15, 30, 90)); // 3:30 PM to 5:00 PM (90-minute slot)
//   for (let hour = 17; hour < 20; hour++) {
//     slots.push(createSlot(currentDate, hour, 0, 60)); // 5:00 PM to 8:00 PM (1-hour slots)
//   }
//   slots.push(createSlot(currentDate, 20, 0, 90)); // 8:00 PM to 9:30 PM (90-minute slot)

//   // Create slots for tomorrow
//   for (let hour = 6; hour < 15; hour++) {
//     slots.push(createSlot(nextDate, hour, 30, 60)); // 6:30 AM to 9:30 AM (1-hour slots)
//   }

//   slots.push(createSlot(nextDate, 15, 30, 90)); // 3:30 PM to 5:00 PM (90-minute slot)
//   for (let hour = 17; hour < 20; hour++) {
//     slots.push(createSlot(nextDate, hour, 0, 60)); // 5:00 PM to 8:00 PM (1-hour slots)
//   }
//   slots.push(createSlot(nextDate, 20, 0, 90)); // 8:00 PM to 9:30 PM (90-minute slot)

//   return slots;
// };
