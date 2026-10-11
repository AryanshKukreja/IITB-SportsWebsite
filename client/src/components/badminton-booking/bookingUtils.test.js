import {
  hasActiveBookingConflict,
  isNumberOfPlayersValid,
  isPlayerRollNumberCountValid,
  normalizeRollNumber,
  parsePlayerRollNumbers,
} from './bookingUtils';

describe('badminton booking helpers', () => {
  it('normalizes owner and player roll numbers without regard to case', () => {
    expect(normalizeRollNumber('  AbC123 ')).toBe('abc123');
    expect(parsePlayerRollNumbers(' AbC123, ,DeF456 ')).toEqual(['abc123', 'def456']);
  });

  it('allows up to four player roll numbers and 2–4 court players', () => {
    expect(isPlayerRollNumberCountValid(['a', 'b', 'c', 'd'])).toBe(true);
    expect(isPlayerRollNumberCountValid(['a', 'b', 'c', 'd', 'e'])).toBe(false);
    expect(isNumberOfPlayersValid(2)).toBe(true);
    expect(isNumberOfPlayersValid(4)).toBe(true);
    expect(isNumberOfPlayersValid(1)).toBe(false);
    expect(isNumberOfPlayersValid(5)).toBe(false);
  });

  it('detects case-insensitive matches in active booking owners and player lists for the same date', () => {
    const bookings = [
      { date: '2026-10-12', rollno: 'Owner123', player_roll_no: 'Teammate456', status: 'pending' },
      { date: '2026-10-12', rollno: 'Accepted789', player_roll_no: '', status: 'accepted' },
      { date: '2026-10-12', rollno: 'Declined111', player_roll_no: 'Declined222', status: 'declined' },
      { date: '2026-10-13', rollno: 'NextDay333', player_roll_no: '', status: 'pending' },
    ];

    expect(hasActiveBookingConflict(bookings, '2026-10-12', ['teammate456'])).toBe(true);
    expect(hasActiveBookingConflict(bookings, '2026-10-12', ['accepted789'])).toBe(true);
    expect(hasActiveBookingConflict(bookings, '2026-10-12', ['declined222'])).toBe(false);
    expect(hasActiveBookingConflict(bookings, '2026-10-12', ['nextday333'])).toBe(false);
    expect(hasActiveBookingConflict(bookings, '2026-10-12', ['newplayer999'])).toBe(false);
  });
});
