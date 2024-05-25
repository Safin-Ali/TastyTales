import { Modal } from 'keep-react';
import React from 'react';
export interface ModalStateHandler extends React.HTMLAttributes<HTMLDivElement> {
	modalState:boolean,
	cb:{
		onDismiss:() => void
	}
}

const Root_Modal: React.FC<ModalStateHandler> = ({cb,modalState,children,...attrs}) => {



	return (
		<>
			<Modal
				isOpen={ modalState }
				onClose={ cb.onDismiss }
			>
				<Modal.Body
					{...attrs}
				>
					{
						children
					}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Root_Modal;