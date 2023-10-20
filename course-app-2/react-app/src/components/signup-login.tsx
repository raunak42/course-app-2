import { Button, Card, IconButton, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { personState } from "../store/atoms/general";
import axios, { AxiosError } from "axios";
import { usernameState, passwordState } from "../store/selectors/general";
import { signupInput, usernameInput, passwordInput } from "@raunaka_/input-validation-for-course-app";
import { useState } from "react";
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
    const setPerson = useSetRecoilState(personState);
    const username: string = useRecoilValue(usernameState);
    const password: string = useRecoilValue(passwordState);
    const incomingData: incomingData = { username, password } //more like outgoingData..? this data is being sent to the backenf via axios
    const parsedInput = signupInput.safeParse(incomingData);
    const parsedUsername = usernameInput.safeParse(username);
    const parsedPassword = passwordInput.safeParse(password);

    const [showPassword, setShowPassword] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [msg, setMsg] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
                if (props.action === "Login") {
                    if (!localStorage.token) {
                        localStorage.setItem("token", data.token);
                    } else {
                        setMsg("Already logged in.");
                    }
                }
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
                        username: event.target.value
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
                alertError ?
                    <Alert
                        variant="outlined"
                        severity="error" style={{ whiteSpace: "pre-line", borderRadius: 25 }}>
                        <div dangerouslySetInnerHTML={{ __html: msg }}></div>
                    </Alert>
                    :
                    <Alert
                        variant="outlined"
                        severity="success" style={{ borderRadius: 25 }}>
                        {msg}
                    </Alert>
            }
        </Snackbar>
    </div >
};

export default SignupLogin;