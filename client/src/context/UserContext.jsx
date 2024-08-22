import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const UserContext = createContext([])

function UserProvider({children}) {
    const [users, setUsers] = useState([])    
    const [cookies, setCookie] = useCookies(['session_id']);
    

    useEffect(() => {
        const loadUsers = async () => {
            const resp = await fetch("/api/users")
            const data = await resp.json()
            setUsers(data)
        }

        loadUsers()
    }, [])

    async function addUser(UserValues) {
        const resp = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UserValues)
        })
    const user = await resp.json()
    setCookie('session_id', user.id)
    setUsers([...users, user])
}

    return <UserContext.Provider value={{users, addUser}}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }