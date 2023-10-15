import { Card, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { AdminSignup, AdminLogin, UserSignup, UserLogin } from "./functions";

function SignupOrLogin(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    let signupOrLogin;
    let handleButtonClick;

    if (props.action === "signup") {
        signupOrLogin = "Sign up";
        if (props.role === "admin") {
            handleButtonClick = () => AdminSignup(username, password, navigate);
        }
        else if (props.role === "user") {
            handleButtonClick = () => UserSignup(username, password, navigate);
        }
    }
    else if (props.action === "login") {
        signupOrLogin = "Log in";
        if (props.role === "admin") {
            handleButtonClick = () => AdminLogin(username, password, navigate);
        }
        else if (props.role === "user") {
            handleButtonClick = () => UserLogin(username, password, navigate);
        }
    }
    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Card style={{ 
                width: 400,
                height: 300,
                marginTop: 150,
                display: "flex",
                justifyContent: "center",
            }}>
                <div style={{ padding: 25 }}>
                    <div>
                        <Typography variant="h4">
                            {signupOrLogin} below
                        </Typography>
                    </div>
                    <div style={{
                        marginTop: 15,
                    }}>
                        <TextField variant="outlined" label="username" style={{ width: 300 }}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}>
                        </TextField>
                    </div>
                    <div style={{
                        marginTop: 15,
                    }}>
                        <TextField variant="outlined" label="password" style={{ width: 300 }}
                            type={"password"}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}>
                        </TextField>
                    </div>
                    <div style={{
                        marginTop: 15,
                    }}>
                        <Button
                            variant="contained"
                            onClick={handleButtonClick}>
                            {signupOrLogin}
                        </Button>

                    </div>
                </div>


            </Card>
        </div>
    </div>
}
export default SignupOrLogin;
