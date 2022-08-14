import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';

import {useSelector, useDispatch} from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';

import { addItemToCart } from '../../store/cart/cart.action';
import { Name, Price, ProductCardContainer, ProductCardFooter } from './product-card.styles';
import { FC } from 'react';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({product}) => {
	const {name, price ,imageUrl} = product;

	const cartItems = useSelector(selectCartItems);

	const dispatch = useDispatch();

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ProductCardFooter>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</ProductCardFooter>
			<Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
		</ProductCardContainer>
	)
}

export default ProductCard;