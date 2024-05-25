import { Avatar, Popover } from 'keep-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logOutUser } from '../../../firebase/utils/firebase_auth_utils';
import { User } from 'firebase/auth';

const Current_Users: React.FC<{ userData: User }> = ({ userData }) => {

	const { userAuth } = useSelector((state: RootState) => state.userData);

	if (!userAuth) return;

	const {
		photoURL
	} = userData;

	return (
		<div>

			<Popover
				placement="bottom"
			>
				<Popover.Action
					className={ `ring-0` }
				>
					<Avatar
						img={ photoURL! }
						size={ 'lg' }
					/>
				</Popover.Action>
				<Popover.Content
					className="z-20 flex items-center gap-3 rounded-xl border bg-white px-1.5 py-1"
				>
					<button
						onClick={ logOutUser }
					>
						Logout
					</button>
				</Popover.Content>
			</Popover>
		</div>
	);
}

export default Current_Users;