import { ChangeEvent, FormEvent, useState } from "react";

import {useDispatch} from 'react-redux';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up.styles'
import { signUpStart } from "../../store/user/user.action";
import { SignUpContainer } from "./sign-up.styles";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const SignUp = () => {

	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}
		try {
			dispatch(signUpStart(email, password, displayName));
			resetFormFields();
		} catch (error) {
			if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
				alert('Email already exists');
			}
			else {
				console.log(error);
			}
		}
	}

	return (
		<SignUpContainer>
			<h2>Don't have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Display name" type="text" name="displayName" value={displayName} onChange={handleChange} required />
				<FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
				<FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
				<FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
				<Button type="submit">Sign up</Button>
			</form>
		</SignUpContainer>
	)
}

export default SignUp;