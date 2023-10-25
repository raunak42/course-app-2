import { Alert, AppBar, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
    const [showSnackbar, setShowSnackbar] = useState(false)
    return <div style={{ padding: 40 }}>
        <AppBar style={{ display: "flex", flexFlow: "row", justifyContent: "space-between", padding: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img src="https://i.redd.it/fhs2f867erpb1.png" style={{ maxHeight: "55px" }} />
                <Typography variant="h3">Coursera</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "30%", marginTop: 10 }}>
            {
                    (
                        window.location.pathname === "/admin/courses" ||
                        window.location.pathname === "/admin/myCourses" 
                    ) ?
                        <Button variant={"contained"} style={{ backgroundColor: "#64b5f6", height: "70%", borderRadius: 25 }}
                            onClick={() => {
                                navigate("/admin/addCourse")
                            }}>
                            Add course
                        </Button>
                        :
                        null
                }
                {
                    (
                        window.location.pathname === "/user/login" ||
                        window.location.pathname === "/admin/login" ||
                        window.location.pathname === "/"
                    ) ?
                        <Button variant={"contained"} style={{ backgroundColor: "#64b5f6", height: "70%", borderRadius: 25 }}
                            onClick={() => {
                                if (window.location.pathname === "/admin/login") {
                                    navigate("admin/signup")
                                } else {
                                    navigate("/user/signup")
                                }
                            }}>
                            SignUp
                        </Button>
                        :
                        null
                }
                {
                    (
                        window.location.pathname !== "/admin/myCourses" &&
                        window.location.pathname !== "/user/myCourses" &&
                        window.location.pathname !== "/user/signup" &&
                        window.location.pathname !== "/admin/signup" &&
                        window.location.pathname !== "/admin/login" &&
                        window.location.pathname !== "/user/login" &&
                        window.location.pathname !== "/"
                    )
                        ?
                        <Button
                            onClick={() => {
                                if (window.location.pathname === "/admin/courses") {
                                    navigate("/admin/myCourses")
                                }
                                if (window.location.pathname === "/user/courses") {
                                    navigate("/user/myCourses")
                                }

                            }}
                            variant={"contained"} style={{ backgroundColor: "#64b5f6", height: "70%", borderRadius: 25 }}>
                            My Courses
                        </Button>
                        :
                        null
                }
                {
                    (
                        window.location.pathname !== "/admin/signup" &&
                        window.location.pathname !== "/admin/login" &&
                        window.location.pathname !== "/user/signup" &&
                        window.location.pathname !== "/user/login" &&
                        window.location.pathname !== "/"
                    )
                        ?
                        <Button onClick={() => {
                            navigate("/");
                            localStorage.clear();
                            setShowSnackbar(true);
                            setTimeout(() => {
                                setShowSnackbar(false)
                            }, 3000);
                        }} variant={"contained"} style={{ backgroundColor: "#64b5f6", height: "70%", borderRadius: 25 }}>
                            Logout
                        </Button>
                        :
                        null
                }
            </div>
        </AppBar>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            open={showSnackbar}>
            <Alert severity="success" style={{ backgroundColor: "greenyellow", borderRadius: 25 }}>
                You've been logged out
            </Alert>

        </Snackbar>
    </div>
}
export default Appbar;
// blue
