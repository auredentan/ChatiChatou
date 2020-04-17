import React, { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import { useStoreActions } from "hooks"

const SignUp = () => {

    const [signupData, setSignupData] = useState({
        email: '',
        password: ''
    })
    const login = useStoreActions(actions => actions.user.login)
    const setSignupField = (field: string, value: string) => {
        setSignupData({...signupData, [field]: value})
    }

    

    return (
        <>
            <TextField label="Email" value={signupData.email} onChange={(event: any) => setSignupField("email", event.target.value)} />
            <TextField label="Password" value={signupData.password} onChange={(event: any) => setSignupField("password", event.target.value)} />
            <Button onClick={() => login(signupData)}>S'inscrire</Button>
        </>
    )
}

export default SignUp