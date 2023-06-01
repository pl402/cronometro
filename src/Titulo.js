import React, { useState } from 'react'
const Titulo = ({ }) => {

    return (
        <div className='row-span-4 p-10 flex items-center justify-center h-full'>
            <div className='text-center'>
                <div className="text-black [text-shadow:0_4px_8px_rgba(0,0,0,0.45)] dark:text-white text-xsl font-mono">
                    CRONÓMETRO
                </div>
                <div className='h-[2vh] bg-black dark:bg-white m-auto rounded-full transition-all' style={{ width: "100%" }}></div>
            </div>
        </div>
    );
}

export default Titulo;