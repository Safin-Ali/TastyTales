import { Avatar, Popover } from 'keep-react';
import React from 'react';
interface PropsType { }

const Current_Users: React.FC = () => {

	return (
		<div>

			<Popover
				placement="bottom"
			>
				<Popover.Action
					className={`ring-0`}
				>
					<Avatar
						size={ 'lg' }
					/>
				</Popover.Action>
				<Popover.Content
				className="z-20 flex items-center gap-3 rounded-xl border bg-white px-1.5 py-1"
				>
					<button>Logout</button>
				</Popover.Content>
			</Popover>
		</div>
	);
}

export default Current_Users;