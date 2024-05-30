import { Spinner } from 'keep-react';
import React from 'react';

interface Props {
	className?:string,
	text?:string
}

const Loading_Screen: React.FC<Props> = ({className,text}) => {

	return (
		<section
			className={ `bg-white h-dvh flex flex-col gap-5 items-center justify-center ${className}` }
		>
			<Spinner color="info" size={ 'xl' } />
			<h5 className={ `text-heading-5` }>{text ? text : 'Loading Interface...'}</h5>
		</section>
	);
}

export default Loading_Screen;