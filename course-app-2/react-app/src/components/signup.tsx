import { Button, Card, FormControl, IconButton, TextField, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { personState } from "../store/atoms/general";
import axios from "axios";
import { nameState, passwordState } from "../store/selectors/general";
import { signupInput } from "@raunaka_/types";
import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface functionProps {
    url: string
}
interface incomingData {
    username: string,
    password: string
}
function Signup(props: functionProps) {

    const setPerson = useSetRecoilState(personState);
    const name = useRecoilValue(nameState);
    const password = useRecoilValue(passwordState);

    const [red1, setRed1] = useState(false);
    const [red2, setRed2] = useState(false);

    const [showPassword, setShowPassword] = useState(false)

    const text = "Signup";

    const handleClick = async () => {

        const incomingData: incomingData = { username: name, password }

        const parsedInput = signupInput.safeParse(incomingData);
        const isValid = parsedInput.success;

        if (isValid) {
            console.log("valid")
            const username = parsedInput.data.username;
            const password = parsedInput.data.password;
            try {
                const res = await axios.post(props.url, { username, password });
                const data = res.data;
                alert(data.message)
            } catch (error) {
                alert(error)
            }
        } else {
            setRed1(parsedInput.error.issues.some(issue => issue.path.includes("username")))
            setRed2(parsedInput.error.issues.some(issue => issue.path.includes("password")))


            const errors = [];
            let msg = "";
            for (let i = 0; i < parsedInput.error.errors.length; i++) {
                const error = parsedInput.error.errors[i].message;
                errors.push(`error ${i + 1}: ${error}`);
                msg = msg + errors[i] + "\n\n";
            }
            alert(msg)
        }
    }
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{
            height: 250,
            width: 400,
            display: "flex", flexFlow: "column", justifyContent: "space-evenly",
            marginTop: 120,
            borderRadius: 20,
            padding: 20
        }}>
            <Typography style={{ textAlign: "center" }} variant="h4">{text} below</Typography>
            <TextField autoFocus={true} label="username" error={red1}
                onChange={(event) => {
                    setPerson((prevState) => ({
                        ...prevState,
                        name: event.target.value
                    }))
                }}>
            </TextField>
            <FormControl>
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
                                    {
                                        (showPassword ? <Visibility /> : <VisibilityOff />)
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}  
                >

                </TextField>
            </FormControl>

            <Button style={{ width: "25%", borderRadius: 20 }} variant="contained"
                onClick={handleClick}>
                {text}
            </Button>
        </Card>
    </div>
};

export default Signup;