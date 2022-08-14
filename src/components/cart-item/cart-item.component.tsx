import React, { FC, memo } from 'react';
import { CartItemContainer, ItemDetails, ItemImage, Name } from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import './cart-item.styles';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({cartItem}) => {
	const {name, imageUrl, price, quantity} = cartItem;
	return (
		<CartItemContainer>
			<ItemImage src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<Name className="name">{name}</Name>
			<span className="price">{quantity} x ${price}</span>
			</ItemDetails>
		</CartItemContainer>
	)
})

export default CartItem;