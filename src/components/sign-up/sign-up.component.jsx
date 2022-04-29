import { useState } from "react";

import {useDispatch} from 'react-redux';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up.styles.scss'
import { signUpStart } from "../../store/user/user.action";

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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}
		try {
			dispatch(signUpStart(email, password, displayName));
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Email already exists');
			}
			else {
				console.log(error);
			}
		}
	}

	return (
		<div className="sign-up-container">
			<h2>Don't have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Display name" type="text" name="displayName" value={displayName} onChange={handleChange} required />
				<FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
				<FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
				<FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
				<Button type="submit">Sign up</Button>
			</form>
		</div>
	)
}

export default SignUp;