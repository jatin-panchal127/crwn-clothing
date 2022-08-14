import './checkout-item.styles.tsx';

import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { ArrowDiv, CheckoutContainer, CheckoutDefault, CheckoutImage, ImageContainer, QuantitySpan, RemoveButton } from './checkout-item.styles';
import { FC, memo } from 'react';
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({cartItem}) => {
	const {name, imageUrl, price, quantity} = cartItem;
	const cartItems = useSelector(selectCartItems);

	const dispatch = useDispatch();


	const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

	const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

	return (
		<CheckoutContainer>
			<ImageContainer>
				<CheckoutImage src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<CheckoutDefault>{name}</CheckoutDefault>
			<QuantitySpan>
				<ArrowDiv onClick={removeItemHandler}>
					&#10094;
				</ArrowDiv>
				<CheckoutDefault>{quantity}</CheckoutDefault>
				<ArrowDiv onClick={addItemHandler}>
					&#10095;
				</ArrowDiv>
			</QuantitySpan>
			<CheckoutDefault>{price}</CheckoutDefault>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutContainer>
	)
})

export default CheckoutItem;