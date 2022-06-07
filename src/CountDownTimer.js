import React, { useState } from 'react'
const CountDownTimer = ({ minutos, pausa }) => {
    const porTotal = minutos * 60;
    const secTotal = porTotal, minutes = minutos, seconds = 0;
    const [[secsTotal, mins, secs], setTime] = React.useState([secTotal, minutes, seconds]);
    const [porcentaje, setPorcentaje] = React.useState(100);
    const [parpadea, setParpadea] = React.useState(true);
    const [color, setColor] = useState("text-black dark:text-white");
    const [bgcolor, setBgcolor] = useState("bg-black dark:bg-white");
    const [minsAmbar, setMinAmbar] = useState(1);
    const [secsAmbar, setSecsAmbar] = useState(0);
    const [minsRojo, setMinRojo] = useState(0);
    const [secsRojo, setSecsRojo] = useState(20);

    const tick = () => {
        if (!pausa) {
            if (mins === minsAmbar && secs === secsAmbar) {
                setColor("text-yellow-500 dark:text-yellow-500");
                setBgcolor("bg-yellow-500 dark:bg-yellow-500");
            } else if (mins === minsRojo && secs === secsRojo) {
                setColor("text-red-500 dark:text-red-500");
                setBgcolor("bg-red-500 dark:bg-red-500");
            }

            if (mins === 0 && secs === 0) {
                setPorcentaje(100);
                setParpadea(!parpadea);
            } else if (secs === 0) {
                setTime([secsTotal - 1, mins - 1, 59]);
                setPorcentaje(secsTotal * 100 / porTotal);
            } else {
                setTime([secsTotal - 1, mins, secs - 1]);
                setPorcentaje(secsTotal * 100 / porTotal);
            }
        }
    };

    //const reset = () => setTime([parseInt(secTotal), parseInt(minutos), parseInt(seconds)]);

    React.useEffect(() => {
        const tiemposAmbar = localStorage.getItem("ambarTiempo") ? localStorage.getItem("ambarTiempo") : "01:00";
        const tiemposRojo = localStorage.getItem("rojoTiempo") ? localStorage.getItem("rojoTiempo") : "00:20";
        const thisAMins = parseInt(tiemposAmbar.split(":")[0]);
        const thisASecs = parseInt(tiemposAmbar.split(":")[1]);
        const thisRMins = parseInt(tiemposRojo.split(":")[0]);
        const thisRSecs = parseInt(tiemposRojo.split(":")[1]);

        setMinAmbar(thisAMins);
        setSecsAmbar(thisASecs);
        setMinRojo(thisRMins);
        setSecsRojo(thisRSecs);

        if (mins === thisAMins && secs === thisASecs) {
            setColor("text-yellow-500 dark:text-yellow-500");
            setBgcolor("bg-yellow-500 dark:bg-yellow-500");
        } else if (mins === thisRMins && secs === thisRSecs) {
            setColor("text-red-500 dark:text-red-500");
            setBgcolor("bg-red-500 dark:bg-red-500");
        }

        const timerId = setInterval(() => tick(), mins === 0 && secs === 0 ? 500 : 1000);
        return () => clearInterval(timerId);
    });

    return (
        <>

            <div style={{ opacity: parpadea ? 100 : 0 }} className={`transition-all relative -top-[15%] z-30`}>
                <div className={`${color} text-xxl transition-all [text-shadow:0_4px_8px_rgba(0,0,0,0.45)]`}>
                    {mins === 0 && secs === 0 ? "00:00" : `${mins
                        .toString()
                        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
                </div>
                <div className={`h-[2vh] ${bgcolor} m-auto rounded-full transition-all drop-shadow-xl relative bottom-10`} style={{ width: `${porcentaje}%` }}></div>
            </div>
        </>
    );
}

export default CountDownTimer;