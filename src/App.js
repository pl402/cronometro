import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faClock, faGear, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react'
import './App.css';
import CountDownTimer from './CountDownTimer';
import FechaYHora from './FechaYHora';
import Titulo from './Titulo';
import InputMask from 'react-input-mask';

function App() {
  const [minutos, setMinutos] = useState(0);
  const [contando, setContando] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(localStorage.getItem("dark") === "true" ? true : false);
  const [pausa, setPausa] = useState(false);
  const [muestraFechaYHora, setMuestraFechaYHora] = useState(false);
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  const pausar = () => {
    setPausa(!pausa)
  };
  const classBoton = "rounded-full bg-[#755e4e] p-3 m-2 text-white disabled:bg-[#755e4e]/20 disabled:text-bg-[#9c8546] drop-shadow disabled:drop-shadow-none transition-all hover:bg-stone-600 active:bg-[#755e4e]";
  const classInp = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right";
  useEffect(() => {
    let readDark = localStorage.getItem("dark") === "true" ? true : false;
    if (readDark)
      document.querySelector("html").classList.add("dark");
    else
      document.querySelector("html").classList.remove("dark");
  });

  const mostrarFechaYHora = () => {
    setMuestraFechaYHora(!muestraFechaYHora);
    setMinutos(0);
    setContando(false);
  }

  const cambiaMinutos = (minutos) => {
    setMuestraFechaYHora(false);
    setMinutos(minutos);
    setContando(true);
  }
  const cambiaMinutosInp = (e) => {
    if (e.key === 'Enter') {
      setMinutos(parseInt(e.target.value));
      setContando(true);
    }
  }
  const resetAll = (e) => {
    setMinutos(0);
    setContando(false);
  }
  const cambiaDark = (e) => {
    let readDark = localStorage.getItem("dark") === "true" ? true : false;
    localStorage.setItem("dark", !readDark);
    setEnabled(!readDark);
  }


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-50"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-80 max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Configuraciones
                </Dialog.Title>
                <div className="mt-2 mb-5">
                  <Switch.Group>
                    <div className="flex items-center">
                      <Switch.Label className="block text-gray-700 text-sm font-bold mb-2 mr-4">Tema Oscuro</Switch.Label>
                      <Switch
                        checked={enabled}
                        onChange={cambiaDark}
                        className={`${enabled ? 'bg-[#755e4e]' : 'bg-[#9c8546]'}
                                    relative inline-flex flex-shrink-0 h-[19px] w-[40px]
                                    border-2 border-transparent rounded-full cursor-pointer
                                    transition-colors ease-in-out duration-200 focus:outline-none
                                    focus-visible:ring-2 focus-visible:ring-white
                                    focus-visible:ring-opacity-75`}
                      >
                        <span className="sr-only">Tema Oscuro</span>
                        <span
                          aria-hidden="true"
                          className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
                                      pointer-events-none inline-block h-[15px] w-[15px]
                                      rounded-full bg-white shadow-lg transform ring-0
                                      transition ease-in-out duration-200`}
                        />
                      </Switch>
                    </div>
                  </Switch.Group>
                </div>
                <div className='flex m-auto mb-5'>
                  <div className="mt-2 w-40 pr-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ambarTiempo">
                      Ámbar
                    </label>
                    <InputMask mask="99:99" className={classInp} id="ambarTiempo" onChange={(e) => localStorage.setItem("ambarTiempo", e.target.value)} type="text" placeholder="min:seg" defaultValue={localStorage.getItem("ambarTiempo") ? localStorage.getItem("ambarTiempo") : "01:00"} />
                  </div>
                  <div className="mt-2 w-40 pl-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rojoTiempo">
                      Rojo
                    </label>
                    <InputMask mask="99:99" className={classInp} id="rojoTiempo" type="text" placeholder="min:seg" onChange={(e) => localStorage.setItem("rojoTiempo", e.target.value)} defaultValue={localStorage.getItem("rojoTiempo") ? localStorage.getItem("rojoTiempo") : "00:20"} />
                  </div>
                </div>

                <div className='flex m-auto mb-5'>
                  <div className="mt-2 w-full pr-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ambarTiempo">
                      Formato de fecha
                    </label>
                    <select className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline w-full" onChange={(e) => localStorage.setItem("formatoFecha", e.target.value)} defaultValue={localStorage.getItem("formatoFecha") ? localStorage.getItem("formatoFecha") : "DD/MM/YYYY"}>
                      <option value="DD/MM/YYYY">15/09/1986</option>
                      <option value="MM/DD/YYYY">09/15/1986</option>
                      <option value="YYYY/MM/DD">1986/09/15</option>
                      <option value="DD-MM-YYYY">15-09-1986</option>
                      <option value="MM-DD-YYYY">09-15-1986</option>
                      <option value="YYYY-MM-DD">1986-09-15</option>
                      <option value="DD.MM.YYYY">15.09.1986</option>
                      <option value="MM.DD.YYYY">09.15.1986</option>
                      <option value="YYYY.MM.DD">1986.09.15</option>
                      <option value="dddd DD [de] MMMM [de] YYYY">lunes 15 de septiembre de 1986</option>
                      <option value="dddd, MMMM DD, YYYY">lunes, septiembre 15, 1986</option>
                      <option value="ddd, DD MMM YYYY">lun., 15 sep 1986</option>
                      <option value="DD [de] MMMM [de] YYYY">15 de septiembre de 1986</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className={`${classBoton} float-right`}
                    onClick={closeModal}
                    style={{ margin: 0 }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="grid grid-rows-6 grid-flow-col gap-4 h-screen w-screen overflow-hidden text-center bg-[#f0e9d6] dark:bg-[#755e4e] z-30">
        <div>
          <div className={`absolute top-2 left-2 opacity-60 z-40 transition-all`}>
            <button className={`${classBoton} w-15 h-15`} onClick={() => mostrarFechaYHora()}>
              <FontAwesomeIcon className='w-6 h-4 m-auto' icon={faClock} />
            </button>
          </div>
          <div className={`absolute top-2 right-2 opacity-60 z-40 transition-all`}>
            {contando ? <>
              <button className={`${classBoton} w-15 h-15`} onClick={() => resetAll()}>
                <FontAwesomeIcon className='w-6 h-4 m-auto' icon={faArrowRotateRight} />
              </button>
              <button className={`${classBoton} w-15 h-15`} onClick={() => pausar()}>
                <FontAwesomeIcon className='w-6 h-4 m-auto' icon={pausa ? faPlay : faPause} />
              </button>
            </> : <>
              <button className={`${classBoton}`} onClick={() => cambiaMinutos(10)}>10min</button>
              <button className={`${classBoton}`} onClick={() => cambiaMinutos(5)}>5min</button>
              <button className={`${classBoton}`} onClick={() => cambiaMinutos(2)}>2min</button>
              <InputMask mask="999" type="text" className={`${classBoton} w-20 text-center`} onKeyPress={(e) => cambiaMinutosInp(e)} placeholder="... min" />
            </>}
            <button className={`${classBoton} w-15 h-15`} onClick={() => openModal()}><FontAwesomeIcon className='w-6 h-4 m-auto' icon={faGear} /></button>
          </div>
        </div>
        {muestraFechaYHora ? <FechaYHora /> :
          contando ? <CountDownTimer minutos={minutos} pausa={pausa} /> :
            <Titulo />
        }
        <div className='transition-all text-center w-full z-20 -mt-10'>
          <img src={`${process.env.PUBLIC_URL}/utics${localStorage.getItem("dark") === "true" ? "_dark" : ""}.png`} className='m-auto w-1/3 max-w-[500px]' alt='UTICs' />
        </div>
      </div>
    </>
  );
}

export default App;
