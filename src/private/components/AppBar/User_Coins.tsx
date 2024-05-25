import { Badge } from 'keep-react';
import React from 'react';
import { BiDollar } from "react-icons/bi";
interface PropsType {
	coins: number
}

const User_Coins: React.FC<PropsType> = ({ coins }) => {

	return (
		<>
			<Badge
				color="primary"
				className={`py-4 px-2`}
			>
				<BiDollar size={25} className={`text-warning-500 inline-block`}/>
				<span className={`inline-block mr-1.5 mb-0.5 text-xl`}>{coins}</span>
			</Badge>
		</>
	);
}

export default User_Coins;