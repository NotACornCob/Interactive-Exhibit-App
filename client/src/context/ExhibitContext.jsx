
import { createContext, useState, useEffect } from 'react';

const ExhibitContext = createContext([])

function ExhibitProvider({children}) {
    const [exhibits, setExhibits] = useState([])

    useEffect(() => {
        const loadExhibits = async () => {
            const resp = await fetch("/api/exhibits")
            const data = await resp.json()
            setExhibits(data)
        }

        loadExhibits()
    }, [])

    return <ExhibitContext.Provider value={{exhibits}}>{children}</ExhibitContext.Provider>
}


export {ExhibitContext, ExhibitProvider}