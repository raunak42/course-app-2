import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

function Routing(role, navigate) {
    if (role === "User") {
        navigate("/user/login") 
    }
    else if (role === "Admin") {
        navigate("/admin/login")
    }
    else {
        alert("please select a role first")
    }
}

function Homepage() {
    const navigate = useNavigate();
    const [role, setRole] = useState("User");

    let handleClick;
    handleClick = () => Routing(role, navigate);

    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 150
        }}>
            <Card style={{
                width: 300,
                height: 260,
                display: "flex",
                justifyContent: "flex-start"
            }}>
                <div style={{ padding: 25 }}>
                    <div>
                        <Typography variant="h5">Choose your role</Typography>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <FormControl>
                            <FormLabel>Role:</FormLabel>
                            <RadioGroup
                                defaultValue='User'
                                onChange={(event) => {
                                    setRole(event.target.value);
                                }}

                            >
                                <FormControlLabel value='User' control={<Radio />} label="1: User" />
                                <FormControlLabel value='Admin' control={<Radio />} label="2: Admin" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <Button
                            variant="contained"
                            onClick={handleClick}
                        >continue</Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
}

export default Homepage;