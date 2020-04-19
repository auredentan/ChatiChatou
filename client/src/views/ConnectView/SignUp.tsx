import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useStoreActions } from 'hooks';


const SignUp = () => {
	const [signupData, setSignupData] = useState({
		email: '',
		password: '',
	});
	const register = useStoreActions((actions) => actions.user.register);
	const setSignupField = (field: string, value: string) => {
		setSignupData({ ...signupData, [field]: value });
	};

	return (
		<div style={{ padding: '8px' }}>
			<TextField
				fullWidth
				label='Email'
				value={signupData.email}
				onChange={(event: any) => setSignupField('email', event.target.value)}
			/>
			<TextField
				fullWidth
				label='Password'
				value={signupData.password}
				onChange={(event: any) =>
					setSignupField('password', event.target.value)
				}
			/>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}
			>
				<Button onClick={() => register(signupData)}>S'inscrire</Button>
			</div>
		</div>
	);
};

export default SignUp;
