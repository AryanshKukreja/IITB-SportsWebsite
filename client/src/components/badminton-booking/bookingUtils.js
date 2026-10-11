export const normalizeRollNumber = (rollNumber) => String(rollNumber || '').trim().toLowerCase();

export const parsePlayerRollNumbers = (rollNumbers) => String(rollNumbers || '')
  .split(',')
  .map(normalizeRollNumber)
  .filter(Boolean);

export const isPlayerRollNumberCountValid = (rollNumbers) => rollNumbers.length <= 4;

export const isNumberOfPlayersValid = (numberOfPlayers) =>
  Number.isInteger(numberOfPlayers) && numberOfPlayers >= 2 && numberOfPlayers <= 4;

export const hasActiveBookingConflict = (bookings, bookingDate, submittedRollNumbers) => {
  const submittedRollNumberSet = new Set(submittedRollNumbers);
  return bookings.some((booking) =>
    booking.date === bookingDate
    && booking.status !== 'declined'
    && [normalizeRollNumber(booking.rollno), ...parsePlayerRollNumbers(booking.player_roll_no)]
      .some((rollNumber) => submittedRollNumberSet.has(rollNumber))
  );
};
