
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

    async function addExhibit(ExhibitValues) {
        const resp = await fetch("http://127.0.0.1:5555/api/exhibits", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ExhibitValues)
        })
    const exhibit = await resp.json()
    setExhibits([...exhibits, exhibit])
}

    return <ExhibitContext.Provider value={{exhibits, addExhibit}}>{children}</ExhibitContext.Provider>
}


export {ExhibitContext, ExhibitProvider}