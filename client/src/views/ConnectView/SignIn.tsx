import React, { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import { useStoreActions } from "hooks"

const SignIn = () => {

    const [siginData, setSigninData] = useState({
        email: '',
        password: ''
    })
    const login = useStoreActions(actions => actions.user.login)
    const setSignupField = (field: string, value: string) => {
        setSigninData({...siginData, [field]: value})
    }

    return (
        <>
            <TextField label="Email" value={siginData.email} onChange={(event: any) => setSignupField("email", event.target.value)} />
            <TextField label="Password" value={siginData.password} onChange={(event: any) => setSignupField("password", event.target.value)} />
            <Button onClick={() => login(siginData)}>Se connecter</Button>
        </>
    )
}

export default SignIn