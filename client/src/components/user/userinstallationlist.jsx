import React from 'react'
import { InstallationContext } from '../../context/InstallationContext'
import { useContext } from 'react'
import UserInstallationCard from './userinstallationcard'
import { useCookies } from 'react-cookie'


function UserInstallationList() {
    const {installations} = useContext(InstallationContext)
    const [cookies] = useCookies(['session_id']);
    const UserInstallationCards = installations.filter(installation => installation.user_id === cookies.session_id).map(filteredInstallation => <UserInstallationCard key={filteredInstallation.id} installation={filteredInstallation} />)
    return (
    <div>{UserInstallationCards}</div>
    )
}

export default UserInstallationList;