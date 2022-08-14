import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import { useNavigate } from 'react-router-dom';

import {useSelector} from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import  { useCallback } from 'react';

const CartDropdown = () => {

	const navigate = useNavigate();
	const cartItems = useSelector(selectCartItems);

	const goToCheckoutHandler = useCallback(() => {
		navigate('/checkout');
	},[navigate]);

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : 
				(
					<EmptyMessage>Let's go buy something</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>Go to checkout</Button>
		</CartDropdownContainer>
	)
}

export default CartDropdown;
