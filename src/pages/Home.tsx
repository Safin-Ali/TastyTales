import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button } from 'keep-react';
import { decrement, increment } from '../redux/slicer/counter_slicer';

const Home: React.FC = () => {

	const {value} = useSelector((state:RootState) => state.counter);

	const dispatch = useDispatch();

	return (
		<div>
			<h1 className={`text-heading-3 text-center`}>{value}</h1>

			<div className={`flex justify-center gap-5`}>
				<Button onClick={() => dispatch(increment())}>Increment</Button>
				<Button onClick={() => dispatch(decrement())}>Decrement</Button>
			</div>
		</div>
	);
}

export default Home;