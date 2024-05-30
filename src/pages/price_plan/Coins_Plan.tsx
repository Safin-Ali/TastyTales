import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Stripe_Checkout from '../../components/Stripe/Stripe_Checkout';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Coins_Plan: React.FC = () => {

	return (
		<>

			<Elements stripe={ stripePromise }>
				<Stripe_Checkout />
			</Elements>

		</>
	);
}

export default Coins_Plan;