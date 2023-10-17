import { Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { personState } from "../store/atoms/general";
import axios, { AxiosError } from "axios";
import { nameState, passwordState } from "../store/selectors/general";
import { signupInput } from "@raunaka_/types";
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
    const name = useRecoilValue(nameState);
    const password = useRecoilValue(passwordState);

    const [red1, setRed1] = useState(false);
    const [red2, setRed2] = useState(false);

    const [showPassword, setShowPassword] = useState(false)

    const handleClick = async () => {

        const incomingData: incomingData = { username: name, password } //more like outgoingData..?

        const parsedInput = signupInput.safeParse(incomingData);
        const isValid = parsedInput.success;

        if (isValid) {
            setRed1(false);
            setRed2(false);
            const username = parsedInput.data.username;
            const password = parsedInput.data.password;
            try {
                const res = await axios.post(props.url, { username, password });
                const data = res.data;
                alert(data.message)
            } catch (error) {
                console.log(error)
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message)
                } else {
                    alert(error)
                }
            }
        } else {
            // console.log(parsedInput.error.errors[0].path[0])
            const errors = [];
            let msg = "";
            for (let i = 0; i < parsedInput.error.errors.length; i++) {
                if (parsedInput.error.errors[i].path[i] === "username") {
                    setRed1(true);
                }
                if (parsedInput.error.errors[i].path[i] === "password") {
                    setRed2(true)
                }


                const error = parsedInput.error.errors[i].message;
                errors.push(`error ${i + 1}: ${error}`);
                msg = msg + errors[i] + "\n\n";
            }
            alert(msg);
        }
    }
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{
            height: 250,
            width: 400,
            display: "flex", flexFlow: "column", justifyContent: "space-evenly",
            borderRadius: 20,
            padding: 20
        }}>
            <Typography style={{ textAlign: "center" }} variant="h4">{props.action} below</Typography>
            <TextField autoFocus={true} label="username" error={red1}
                onChange={(event) => {
                    setPerson((prevState) => ({
                        ...prevState,
                        name: event.target.value
                    }))
                }}>
            </TextField>
            <TextField
                type={showPassword ? "text" : "password"} label="password" error={red2}
                onChange={(event) => {
                    setPerson((prevState) => ({
                        ...prevState,
                        password: event.target.value
                    }));
                }}
                InputProps={{
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
                onClick={handleClick}>
                {props.action}
            </Button>
        </Card>
    </div>
};

export default SignupLogin;