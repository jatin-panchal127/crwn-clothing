import { Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from "../../components/cart-icon/cart-icon.component";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {useSelector, useDispatch} from 'react-redux';

import { signOutStart } from "../../store/user/user.action";

import { selectCurrentUser } from "../../store/user/user.selector";

import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";
import React from "react";

const Navigation = () => {

	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	
	const isCartOpen = useSelector(selectIsCartOpen);

	const signOutHandler = () => {
		dispatch(signOutStart());
	};
	return (
		<>
			<NavigationContainer>
				<LogoContainer to='/'>
					<div className="logo">
						<CrwnLogo />
					</div>
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>Shop</NavLink>
					{
						currentUser ? (
							<NavLink as='span' onClick={signOutHandler}>Sign out</NavLink>
						) :
							(<NavLink to='/auth'>Sign In</NavLink>)
					}
					<CartIcon/>
				</NavLinks>
				{
					isCartOpen && <CartDropdown/>
				}
			</NavigationContainer>
			<Outlet />
		</>
	)
}

export default Navigation;