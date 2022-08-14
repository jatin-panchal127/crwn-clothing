import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import React, { FormEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPES_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./PaymentForm.styles";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const [isProcessingTransaction, setIsProcessingTransaction] = useState(false)

	const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		setIsProcessingTransaction(true)

		const response = await fetch("/.netlify/functions/create-payment-intent", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount: amount }),
		}).then((res) => res.json());

		const {
			paymentIntent: { client_secret },
		} = response;

		const cardDetails = elements.getElement(CardElement);

		if(!ifValidCardElement(cardDetails)) return;

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: cardDetails,
				billing_details: {
					name: currentUser ? currentUser.displayName : "Guest"
				},
			},
		});

		setIsProcessingTransaction(false)

		if (paymentResult.error) {
			alert(paymentResult.error.message);
		} else {
			if (paymentResult.paymentIntent.status === "succeeded") {
				alert("payment success");
			}
		}
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<PaymentButton buttonType={BUTTON_TYPES_CLASSES.inverted} isLoading={isProcessingTransaction}>Pay now</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
