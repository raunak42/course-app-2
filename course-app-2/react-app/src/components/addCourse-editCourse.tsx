import { Alert, Button, Card, Snackbar, TextField, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { outgoingCourseState } from "../store/atoms/outgoingCourse";
import { courseDetailsInput } from "@raunaka_/input-validation-for-course-app";
import axios from "axios";
import { IdescriptionState, /*IidState,*/ IimageLinkState, IpriceState, ItitleState } from "../store/selectors/incomingCourse";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface propsCourse {
    action: string,
    reqType: "post" | "put" | "get" | "delete",
    url: string
}

function AddEditCourse(props: propsCourse) {
    const navigate = useNavigate();

    const [course, setCourse] = useRecoilState(outgoingCourseState);


    const Ititle = useRecoilValue(ItitleState);
    const Idescription = useRecoilValue(IdescriptionState);
    const IimageLink = useRecoilValue(IimageLinkState);
    const Iprice = useRecoilValue(IpriceState);
    // // const id = useRecoilValue(IidState);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [price, setPrice] = useState<any>("");
    // // const [id, setId] = useState(Iid);

    const [msg, setMsg] = useState("")
    const [alertError, setAlertError] = useState(false)
    const [showSnackbar, setShowSnackbar] = useState(false)

    useEffect(() => {
        setTitle(Ititle);
        setDescription(Idescription);
        setImageLink(IimageLink);
        setPrice(Iprice);
        setCourse((prevState) => ({
            ...prevState,
            title: Ititle,
            description: Idescription,
            imageLink: IimageLink,
            price: Iprice,
        }))
    }, [Ititle, Idescription, IimageLink, Iprice])

    const reqType = props.reqType;

    const parsedCourse = courseDetailsInput.safeParse(course);

    const handleClick = async () => {
        setMsg("")
        if (parsedCourse.success) {
            const outgoingCourse = parsedCourse.data;
            const token = localStorage.getItem("token")
            const res = await axios[reqType](props.url, outgoingCourse, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            setShowSnackbar(true)
            if (data.message) {
                setAlertError(false)
                setMsg(data.message)
                setTimeout(() => {
                    setShowSnackbar(false)
                }, 3000);
            }
            if (data.error) {
                setAlertError(true)
                setMsg(data.error)
                setTimeout(() => {
                    // navigate("/admin/login")
                    setShowSnackbar(false)
                }, 3000);
            }
        } else {
            const errors: string[] = [];
            for (let i = 0; i < parsedCourse.error.errors.length; i++) {
                const error = parsedCourse.error.errors[i].message;
                errors.push(error);
                setMsg((prevMsg) => (prevMsg + errors[i] + "\n"))
                setShowSnackbar(true);
                setAlertError(true)
            }
            setTimeout(() => {
                setShowSnackbar(false)
            }, 3000);
        }

    }

    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{
            width: 450,
            height: 450,
            borderRadius: 20,
            display: "flex", flexFlow: "column", justifyContent: "space-evenly",
            padding: 20
        }}>
            <Typography variant="h4" textAlign={"center"}>{props.action} course</Typography>
            <TextField label={"title"}
                value={title}
                autoFocus={true}
                onChange={(event) => {
                    setTitle(event.target.value);
                    setCourse((prevState) => ({
                        ...prevState,
                        title: event.target.value
                    }))
                }} />
            <TextField label={"description"}
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value)
                    setCourse((prevState) => ({
                        ...prevState,
                        description: event.target.value
                    }))
                }} />
            <TextField label={"image link"}
                value={imageLink}
                onChange={(event) => {
                    setImageLink(event.target.value)
                    setCourse((prevState) => ({
                        ...prevState,
                        imageLink: event.target.value
                    }))
                }} />
            <TextField label={"price"}
                type="number"
                value={price}
                onChange={(event) => {
                    const parsedPrice = parseFloat(event.target.value);
                    setPrice(parsedPrice)
                    setCourse((prevState) => ({
                        ...prevState,
                        price: parsedPrice
                    }))

                }} />
            <Button variant="contained"
                style={{ width: "25%", borderRadius: 20 }}
                onClick={handleClick}>Save</Button>
        </Card>
        <Snackbar
            open={showSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}>
            {
                alertError ?
                    <Alert variant="outlined" severity="error" style={{ whiteSpace: "pre-line", borderRadius: 25 }}>
                        <div dangerouslySetInnerHTML={{ __html: msg }} ></div>
                    </Alert>
                    :
                    <Alert variant="outlined" style={{ borderRadius: 25 }} severity="success">
                        {msg}
                    </Alert>
            }
        </Snackbar>
    </div>
};
export default AddEditCourse;