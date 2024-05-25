import { Alert, Button } from 'keep-react';
import React from 'react';
import Root_Modal, { ModalStateHandler } from './Root_Modal';

interface PropsType extends ModalStateHandler {
	alertShortDesc: string,
	alertTitle: string,
	possitiveButton: {
		label: string,
		cb: () => void
	},
	negativeButton: {
		label: string,
		cb: () => void
	},
}

const Confirm_Alert: React.FC<PropsType> = ({
	className,
	cb,
	modalState,
	alertShortDesc,
	alertTitle,
	possitiveButton,
	negativeButton,
	...attrs }) => {

	return (
		<>
			<Root_Modal
				cb={ cb }
				modalState={ modalState }
				className={ `flex w-[30rem] bg-transparent flex-col items-center p-6 lg:p-8` }
			>
				<Alert className="!max-w-[420px]" color="primary" withBg={ true }>
					<Alert.Container className="flex items-start">
						<Alert.Icon/>
						<Alert.Body
							className={ `flex flex-col items-start gap-3 ${className}` }
								{...attrs}
							>
							<Alert.Title className="text-body-2">{alertTitle}</Alert.Title>
							<Alert.Description className="block w-full sm:line-clamp-none">
								{alertShortDesc}
							</Alert.Description>
							<Alert.Container>
								<Button onClick={possitiveButton.cb} size="sm" color="primary">
									{possitiveButton.label}
								</Button>
								<Button onClick={negativeButton.cb} size="sm" color="primary" variant="outline">
									{negativeButton.label}
								</Button>
							</Alert.Container>
						</Alert.Body>
						<Alert.Dismiss onClick={cb.onDismiss}/>
					</Alert.Container>
				</Alert>
			</Root_Modal>
		</>
	);
}

export default Confirm_Alert;