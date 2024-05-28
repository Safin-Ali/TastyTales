import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'keep-react';
interface PropsType { children: React.ReactElement }

const Private_Route: React.FC<PropsType> = ({ children }) => {

	const { userAuth } = useSelector((state: RootState) => state.userData);

	const navigate = useNavigate();

	if(!userAuth) {
		toast.error('You need to LogIn');
		navigate(-1)
		return
	}

	return (
		<>
		{
			children
		}
		</>
	);
}

export default Private_Route;