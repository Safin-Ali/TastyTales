import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Coin_Price_Card from '../../components/Card/Coin_Price_Card';
import Root_Modal from '../Modal/Root_Modal';
import { Button, toast } from 'keep-react';
import { endpointApi } from '../../utils/https-fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { incInstantCoin } from '../../redux/slicer/userData_slicer';
import { useNavigate } from 'react-router-dom';

const Stripe_Checkout: React.FC = () => {

	const [clientSec, setClientSec] = useState<string>('');

	const { userAuth } = useSelector((state: RootState) => state.userData);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const stripe = useStripe();
	const elements = useElements();

	const handlePayment = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const { error, paymentIntent } = await stripe.confirmCardPayment(clientSec, {
			payment_method: {
				card: elements.getElement(CardElement)!,
			},
		});

		if (error) {
			toast.error('Payment failed!',{
				position:'bottom-center'
			})
			setClientSec('');
		} else if (paymentIntent?.status === 'succeeded') {
			try {
				const response = await endpointApi.patch('/users/updateCoins',{
					headers: {
						'Content-Type': 'application/json',
					},
					body:JSON.stringify({paymentIntentId:paymentIntent.id,email:userAuth?.email})
				})
				if(response.status === 200) {
					toast.success('Payment successful!',{
						position:'bottom-center'
					})
					const {coins} = await response.json();
					dispatch(incInstantCoin(parseInt(coins)));
					setClientSec('');
					navigate('/recipes');
					return
				}
			} catch (error) {
				toast.error('Payment failed!',{
					position:'bottom-center'
				})
				setClientSec('');
			}
		}
	};

	const handleModal = () => {
		setClientSec('');
	}

	return (
		<>
			<div className="flex justify-center gap-8 items-center h-[65dvh]">
				<Coin_Price_Card coins={ 100 } price={ 1 } cb={ setClientSec } />
				<Coin_Price_Card coins={ 500 } price={ 5 } cb={ setClientSec } />
				<Coin_Price_Card coins={ 1000 } price={ 10 } cb={ setClientSec } />
			</div>
			<Root_Modal cb={ { onDismiss: handleModal } } modalState={ !!clientSec }>
				{
					clientSec &&
					<form
						onSubmit={ handlePayment }>
						<div className={`border rounded-lg p-5`}>
							<CardElement />
						</div>
						<div className={`w-fit mx-auto mt-5`}>
							<Button
								type="submit"
								size={ 'xs' }
								disabled={ !stripe }
							>
								Confirm
							</Button>
						</div>
					</form>
				}
			</Root_Modal>
		</>
	);
};

export default Stripe_Checkout;
