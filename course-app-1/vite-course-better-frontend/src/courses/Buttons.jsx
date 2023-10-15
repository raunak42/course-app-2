import { Button, Typography } from "@mui/material";
import axios from "axios";

async function ClickBuy(courseId) {
    console.log(courseId);
    try {
        const token = localStorage.getItem("token")
        const res = await axios.post("http://localhost:3000/users/courses/" + courseId, {}, {
            headers: { authorization: "Bearer " + token },
            params: { courseId: courseId }
        });
        let data = res.data;
        alert(data.message);
    } catch (error) {
        const errMsg = error;
        console.log(errMsg);
    }
}

export function BuyButton(courseId, props) {
    const handleClick = () => ClickBuy(courseId);

    if (window.location.pathname === "/user/courses" ||
        window.location.pathname === "admin/courses") {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", padding: 5 }}>
                <div>
                    <Typography variant="subtitle" style={{ color: "#B8860B", marginLeft: 5 }}>
                        ₹ {props.course.price}/-
                    </Typography>
                </div>
                <div style={{ marginRight: 5 }}>
                    <Button
                        style={{ borderColor: "#B8860B", color: "#B8860B" }}
                        size="small"
                        variant="outlined"
                        onClick={handleClick}
                    >
                        Buy it
                    </Button>
                </div>
            </div>
        );
    }
    return null;
}

export function EditButton(courseId, navigate) {
    if (window.location.pathname !== "/user/myCourses" &&
        window.location.pathname !== "/user/courses") {
        return (
            <div style={{ padding: 5 }}>
                <Button
                    style={{ borderColor: "#B8860B", color: "#B8860B" }}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                        navigate("/admin/edit/" + courseId);
                    }}
                >
                    Edit
                </Button>
            </div>

        );
    }
    return null;
}