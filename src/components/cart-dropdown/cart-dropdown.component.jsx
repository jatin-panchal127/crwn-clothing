import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {

	const {cartItems, cartCount} = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	}

	return(
		<CartDropdownContainer>
			<CartItems>
				{	
					cartCount === 0 ? <EmptyMessage>Let's go buy something!</EmptyMessage> : 
					cartItems.map((item) => <CartItem cartItem={item} key={item.id}/>)
				}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>Go to checkout</Button>
		</CartDropdownContainer>
	)
}

export default CartDropdown;
