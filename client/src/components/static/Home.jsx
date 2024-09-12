import { useContext, useEffect } from 'react';
import LoginForm from '../user/login';
import { useCookies } from 'react-cookie';
import ExhibitList from '../exhibits/exhibitlist';
import { SocketContext } from '../../context/SocketContext.jsx';

function Home({ setIsLoggedIn }) {
	const [cookies] = useCookies(['session_id']);
	const socket = useContext(SocketContext);
	const hasCookie = !!cookies.session_id;

	return (
		<div>
			{hasCookie ? (
				<div>
					<ExhibitList />
				</div>
			) : (
				<div>
					<LoginForm />
				</div>
			)}
		</div>
	);
}

export default Home;

