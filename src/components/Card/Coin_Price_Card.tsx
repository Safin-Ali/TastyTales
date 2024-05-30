import { Button } from 'keep-react';
import { endpointApi } from '../../utils/https-fetcher';
import { getJwt } from '../../utils/common';

interface Props {
	readonly price: number
	readonly coins: number
	readonly cb: React.Dispatch<React.SetStateAction<string>>
}

const Coin_Price_Card: React.FC<Props> = ({ coins, price,cb }) => {

	const createPaymentIntent = async () => {
		const response = endpointApi.post('/purchase/createPaymentIntent', {
			method: 'POST',
			headers: {
				'Authorization':getJwt(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount:price }),
		});
		const { clientSecret } = await (await response).json();
		cb(clientSecret)
	};

	return (
		<div className="border w-fit rounded-lg overflow-hidden p-5">
			<div className="px-4 py-2">
				<h2 className="text-xl font-semibold uppercase">{ coins } Coins</h2>
				<p className="text-metal-600 mt-2">Price: ${ price }</p>
			</div>
			<div className="px-4 py-2">
				<Button
					size={ 'sm' }
					onClick={createPaymentIntent }
				>
					Buy Now
				</Button>
			</div>
		</div>
	);
};

export default Coin_Price_Card;