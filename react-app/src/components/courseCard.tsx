import { Alert, Box, Button, Card, CardMedia, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

interface CourseCardProps {
    course: {
        _id: string
        title: string,
        description: string,
        imageLink: string,
        price: number
    },
    action: string,
    buttonUrl: string
}

type buttonReq = "post" | "put" | "get";

function CourseCard(props: CourseCardProps) {
    const [msg, setMsg] = useState("")
    const [showSnackbar, setShowSnackbar]= useState(false)
    const courseId = props.course._id;
    const navigate = useNavigate();
    let buttonClickReqType: buttonReq;
    //const url = props.buttonUrl

    if (props.action === "Buy") {
        buttonClickReqType = "post"
    }

    const handleClick = async () => {
        if (props.action === "Edit") {
            navigate(`/admin/editCourse/${courseId}`)
        }
        if (props.action === "Buy") {
            const token = localStorage.getItem("token")
            const res = await axios[buttonClickReqType](`${BASE_URL}/user/course/${courseId}`, {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setShowSnackbar(true)
            setMsg(res.data.message)
            setTimeout(() => {
                setShowSnackbar(false)
            }, 3000);
        }
    }


    return <div style={{ padding: 15 }}>
        <Card style={{
            width: 300, height: 320, borderRadius: 10, padding: 5,
            display: "flex", flexFlow: "column", justifyContent: "space-between"
        }}>
            <Typography textAlign={"center"} variant="h4">
                {props.course.title}
            </Typography>
            <Typography textAlign={"center"} variant="body1">
                {props.course.description}
            </Typography>
            <Box display="flex" justifyContent="center">
                <Card style={{
                    width: "90%"
                }}>
                    <CardMedia
                        component="img"
                        src={props.course.imageLink}
                    />
                </Card>
            </Box>
            <div style={{ display: "flex", justifyContent: "space-between", 
            marginTop: 3,
            marginBottom:3
            }}>
                <Typography variant="body2">
                    ₹ {props.course.price}/-
                </Typography>
                <Button variant="contained" style={{ borderRadius: 25 }} size="small"
                    onClick={handleClick}>
                    {props.action}
                </Button>
            </div>
        </Card>
        <Snackbar anchorOrigin={{vertical:"top", horizontal:"left"}} open={showSnackbar}>
            <Alert severity="success" style={{backgroundColor:"greenyellow", borderRadius:25}}>
                {msg}
            </Alert>
        </Snackbar>
    </div>
}
export default CourseCard;