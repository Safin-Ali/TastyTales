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
	const [paymentLoad, setPaymentLoad] = useState<boolean>(false);

	const { userAuth } = useSelector((state: RootState) => state.userData);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const stripe = useStripe();
	const elements = useElements();

	const handlePayment = async (event: React.FormEvent) => {
		event.preventDefault();

		const promise = async() => {
			try {
				setPaymentLoad(!paymentLoad)
				if (!stripe || !elements) {
					throw new Error();
				}

				const { error, paymentIntent } = await stripe.confirmCardPayment(clientSec, {
					payment_method: {
						card: elements.getElement(CardElement)!,
					},
				});

				if (error) {
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
							const {coins} = await response.json();
							dispatch(incInstantCoin(parseInt(coins)));
							setClientSec('');
							return
						}
					} catch (error) {
						throw new Error();
					}
				}
			} catch (error) {
				setClientSec('');
			} finally {
				setClientSec('');
				setPaymentLoad(!paymentLoad)
			}
		}

		toast.promise(promise,{
			success:() => {
				navigate('/recipes');
				return 'Payment success!'
			},
			position:'bottom-center',
			loading:'Payment processing...',
			error:'Payment failed!'
		})
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
								className={paymentLoad ? 'opacity-40 select-none' : ''}
								disabled={ paymentLoad }
							>
								PAY
							</Button>
						</div>
					</form>
				}
			</Root_Modal>
		</>
	);
};

export default Stripe_Checkout;
