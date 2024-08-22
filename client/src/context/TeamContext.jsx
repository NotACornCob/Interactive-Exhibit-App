
import { createContext, useState, useEffect } from 'react';

const TeamContext = createContext([])

function TeamProvider({children}) {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        const loadTeams = async () => {
            const resp = await fetch("/api/teams")
            const data = await resp.json()
            setTeams(data)
        }

        loadTeams()
    }, [])

    return <TeamContext.Provider value={{teams}}>{children}</TeamContext.Provider>
}

export {TeamContext, TeamProvider}