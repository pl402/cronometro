import React, { useState, useEffect } from 'react';
import moment from 'moment';
const FechaYHora = () => {

    const [hora, setHora] = useState(new Date().toLocaleTimeString());
    const [fecha, setFecha] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const interval = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
            // setFecha desde moment con formato desde localStorage.formatoFecha
            setFecha(moment().format(localStorage.formatoFecha || 'DD/MM/YYYY'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (

        <div className='row-span-4 p-10 flex items-center justify-center h-full'>
            <div className='text-center'>
                <div className="text-black dark:text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.45)] text-xsl font-mono leading-none border-b border-black/40 dark:border-white/40 ">
                    {hora}
                </div>
                <div className='text-black dark:text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.45)] m-auto transition-all text-xxs leading-none'> {fecha} </div>
            </div>
        </div>
    );
}

export default FechaYHora;