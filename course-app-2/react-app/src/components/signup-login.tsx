import { Button, Card, IconButton, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { personState } from "../store/atoms/general";
import axios, { AxiosError } from "axios";
import { nameState, passwordState } from "../store/selectors/general";
import { signupInput, usernameInput, passwordInput } from "@raunaka_/input-validation-for-course-app";
import { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface functionProps {
    url: string,
    action: string
}
interface incomingData {
    username: string,
    password: string
}
function SignupLogin(props: functionProps) {
    const [msg, setMsg] = useState("")
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [alertError, setAlertError] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const setPerson = useSetRecoilState(personState);
    const name = useRecoilValue(nameState);
    const password = useRecoilValue(passwordState);

    const [showPassword, setShowPassword] = useState(false)

    const incomingData: incomingData = { username: name, password } //more like outgoingData..?
    const parsedInput = signupInput.safeParse(incomingData);
    const parsedPassword = passwordInput.safeParse(password);
    const parsedUsername = usernameInput.safeParse(name);

    useEffect(() => {
        console.log(msg);
    }, [msg]);

    const handleClick = async () => {
        setIsButtonDisabled(true)
        setTimeout(() => {
            setShowSnackbar(false);
            setIsButtonDisabled(false)
            setMsg("")
        }, 3000);

        if (parsedInput.success) {
            const username = parsedInput.data.username;
            const password = parsedInput.data.password;
            try {
                const res = await axios.post(props.url, { username, password });
                const data = res.data;
                setMsg(data.message);
                console.log(msg, "1");
                setShowSnackbar(true);
                setAlertError(false)
            } catch (error) {
                console.log(error)
                if (error instanceof AxiosError) {
                    setMsg(error.response?.data.message)
                } else {
                    console.log(error);
                    setMsg(JSON.stringify(error))
                }
                setShowSnackbar(true);
                setAlertError(true)
            }
        } else {
            const errors: string[] = [];
            for (let i = 0; i < parsedInput.error.errors.length; i++) {
                const error = parsedInput.error.errors[i].message;
                errors.push(`${error}`);
                setMsg((prevMsg) => prevMsg + errors[i] + "\n");
                setShowSnackbar(true);
                setAlertError(true)
            }
        }
    }
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{
            height: 300,
            width: 400,
            display: "flex", flexFlow: "column", justifyContent: "space-evenly",
            borderRadius: 20,
            padding: 20
        }}>
            <Typography style={{ textAlign: "center" }} variant="h4">{props.action} below</Typography>
            <TextField autoFocus={true}
                label="username"
                onChange={(event) => {
                    setPerson((prevState) => ({
                        ...prevState,
                        name: event.target.value
                    }));
                }}
                error={!parsedUsername.success}>
            </TextField>
            <TextField
                type={showPassword ? "text" : "password"}
                label="password"
                onChange={(event) => {
                    setPerson((prevState) => ({
                        ...prevState,
                        password: event.target.value
                    }));
                }}
                error={!parsedPassword.success}
                InputProps={{
                    style: {
                        color: ("#ff44336")
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                {(showPassword ? <Visibility /> : <VisibilityOff />)}
                            </IconButton>
                        </InputAdornment>
                    )
                }}>
            </TextField>
            <Button style={{ width: "25%", borderRadius: 20 }} variant="contained"
                onClick={handleClick}
                disabled={isButtonDisabled}>
                {props.action}
            </Button>
        </Card>
        <Snackbar
            open={showSnackbar}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left"
            }}>
            {
                alertError === true ?
                    <Alert
                        severity="error" style={{ whiteSpace: "pre-line" }}>
                        <div dangerouslySetInnerHTML={{ __html: msg }}></div>
                    </Alert>

                    :
                    <Alert severity="success">
                        {msg}
                    </Alert>

            }

        </Snackbar>
    </div >
};

export default SignupLogin;