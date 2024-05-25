import { Spinner } from 'keep-react';
import React from 'react';

const Loading_Screen: React.FC = () => {

	return (
		<section
			className={ `bg-white h-dvh flex flex-col gap-5 items-center justify-center` }
		>
			<Spinner color="info" size={ 'xl' } />
			<h5 className={ `text-heading-5` }>Loading Interface...</h5>
		</section>
	);
}

export default Loading_Screen;