'use client'; // Error components must be Client Components

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [redirectTime, setRedirectTime] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setRedirectTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval); // Limpa o intervalo quando a contagem chega a 0
          redirect('/');
        }
      });
    }, 1000);
  
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div>
      <h2 className='text-2xl text-white'>Ops...página não encontrada!</h2>
      <p className='text-2xl text-white'>
        Você será redirecionado automaticamente em {redirectTime}
      </p>
    </div>
  );
}
