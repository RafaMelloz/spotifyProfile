'use client'

export function SwitchTimeTipe({longType, setLongType, desc} : {longType: string, setLongType: Function, desc: string}){
    return(
        <div className="text-white w-ful flex flex-col md:flex-row md:justify-between md:items-center">
            <h2 className="font-bold text-2xl text-center md:text-start">{desc}</h2>


            <ul className="flex gap-4 font-semibold text-white/70 justify-center md:justify-normal">
                <li onClick={() => setLongType('long_term')} className={`duration-200 text-sm sm:text-base ${longType === 'long_term' ? 'text-spotify hover:text-spotify' : 'hover:text-white'} `}>Ultimo ano </li>
                <li onClick={() => setLongType('medium_term')} className={`duration-200 text-sm sm:text-base ${longType === 'medium_term' ? 'text-spotify hover:text-spotify' : 'hover:text-white'} `}>Últimos 6 meses</li>
                <li onClick={() => setLongType('short_term')} className={`duration-200 text-sm sm:text-base ${longType === 'short_term' ? 'text-spotify hover:text-spotify' : 'hover:text-white'} `}>Últimas 4 semanas</li>
            </ul>
        </div>
    )
}