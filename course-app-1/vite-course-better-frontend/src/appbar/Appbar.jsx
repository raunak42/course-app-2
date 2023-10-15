import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminData, fetchUsers, logout, userData } from "./functions";


function Appbar() {
    const navigate = useNavigate();

    let handleClick = () => logout(navigate);

    let greet, user;
    let button = "log out";
    const [userName, setUserName] = useState(null);
    const [adminName, setAdminName] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [userList, setUserList] = useState(null);


    useEffect(() => {

        async function fetchAdmin() {
            const admin = await adminData();
            setAdminName(admin.username);
        };

        async function fetchUser() {
            const user = await userData();
            setUserName(user.username);
            setUserId(user._id);
        };


        async function fetchUserList() {
            const userList = await fetchUsers();
            setUserList(userList);
        };

        fetchAdmin();
        fetchUser();
        fetchUserList();

    }, [])

    if (userName === null && adminName === null) {
        greet = "";
        button = null;
    } else if (userName && userId) {
        greet = "Welcome " + userName + "!";
        if (userList) {
            user = userList.find((t) => t._id === userId);
        }

    } else if (adminName) {
        greet = "Welcome " + adminName + "!";
    }


    return <div>
        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "", padding: 8 }}>
            <div>
                <Typography variant="h4">
                    Coursera
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4">
                    {greet}
                </Typography>
                <div>
                    {
                        userName || adminName ?
                            <Button size="small" variant="contained" style={{ marginLeft: 40 }} onClick={handleClick}>
                                {button}
                            </Button>
                            :
                            ""
                    }
                </div>
                <div>
                    {
                        user && window.location.pathname === "/user/courses" ?
                            <Button size="small" variant="contained" style={{ marginLeft: 40 }} onClick={() => {
                                navigate("/user/myCourses");
                            }}>  My courses
                            </Button>
                            :
                            ""
                    }
                </div>

            </div>
        </div>


    </div>
}
export default Appbar;