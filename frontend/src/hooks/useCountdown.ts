import { useState, useEffect } from 'react';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Target: 12 April 2026, 9:00 AM IST (UTC+5:30)
// IST = UTC + 5:30, so 9:00 AM IST = 3:30 AM UTC
const TARGET_DATE = new Date('2026-04-12T03:30:00Z');

function getTimeLeft(): CountdownState {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

export function useCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
}
