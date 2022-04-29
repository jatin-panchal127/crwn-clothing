import { useState } from "react";

import {useDispatch} from 'react-redux'

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import './sign-in.styles.scss'

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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}


	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorrect credentials');
					break;
				case 'auth/user-not-found':
					alert('Incorrect credentials');
					break;
				default:
					alert('failed to login');
					console.log(error)
			}

		}
	}

	return (
		<div className="sign-in-container">
			<h2>Already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
				<FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
				<div className="buttons-container">
					<Button type="submit">Sign in</Button>
					<Button type='button' buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google Sign in</Button>
				</div>
			</form>
		</div>
	)
}

export default SignIn;