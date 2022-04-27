import { useContext } from "react";

import { Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from "../../contexts/user.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { CartContext } from "../../contexts/cart.context";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const {isCartOpen} = useContext(CartContext);

	const signOutHandler = async() => {
		await signOutUser();
	}
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