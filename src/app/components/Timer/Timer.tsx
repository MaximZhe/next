'use client'

import { useModalContext } from '@/contex/modal';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Timer = ({ isTicketPage }: { isTicketPage: boolean }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [stopTimer, setStopTimer] = useState(false);
  const pathname = usePathname();
  const { isModal, setIsModal } = useModalContext();

  useEffect(() => {
    // Проверяем, есть ли сохраненное время в localStorage
    const savedTime = localStorage.getItem('timer');
    if (savedTime) {
      setTimeLeft(savedTime);
    } else {
      setTimeLeft('20:00');
    }

    const timerInterval = setInterval(() => {
      const [minutes, seconds] = timeLeft.split(':');

      let minutesLeft = parseInt(minutes, 10);
      let secondsLeft = parseInt(seconds, 10);

      secondsLeft--;

      if (secondsLeft === -1) {
        minutesLeft--;
        secondsLeft = 59;
      }

      // Преобразуем минуты и секунды обратно в строку
      const newTimeLeft = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

      // Обновляем состояние времени
      setTimeLeft(newTimeLeft);
      localStorage.setItem('timer', newTimeLeft);

      if (minutesLeft === 0 && secondsLeft === 0) {
        clearInterval(timerInterval);
        setStopTimer(true);
        localStorage.removeItem('timer');
        if (pathname === '/find/client') {
          setIsModal(true)
          localStorage.setItem('backPage', 'true');
        }
      }

      if (!isTicketPage) {
        // Обнуляем таймер при переходе на другую страницу
        setTimeLeft('20:00');
        localStorage.removeItem('timer');
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [isTicketPage, stopTimer, timeLeft]);

  return (
    <>
      <div className='tickets-item-info-timer__value'>{timeLeft}</div>
    </>
  );
};

export default Timer;

