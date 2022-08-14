import { ChangeEvent, FormEvent, useState } from "react";

import {useDispatch} from 'react-redux'

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import './sign-in.styles'
import { ButtonsContainer, SignInContainer } from "./sign-in.styles";

const defaultFormFields = {
	email: '',
	password: ''
}

const SignIn = () => {

	const dispatch = useDispatch();

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}


	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			resetFormFields();
		} catch (error) {
			console.log(error)
			}

		
	}

	return (
		<SignInContainer>
			<h2>Already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
				<FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
				<ButtonsContainer>
					<Button type="submit">Sign in</Button>
					<Button type='button' buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google Sign in</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	)
}

export default SignIn;