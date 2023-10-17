import { Button, Card, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import axios from "axios";

interface propsCourse {
    action: string,
    reqType: string, //find a way to keep this, or else you'll have to change the put to post for editCourse in backend, and you don't want that because you want your componenet to be as general as possible
    url: string
}


function AddEditCourse(props: propsCourse) {
    const [course, setCourse] = useRecoilState(courseState)

    const handleClick = async () => {
        const token = localStorage.getItem("token") //setItem at login!!!
        const res = await axios.post(props.url, { course }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
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
                autoFocus={true}
                onChange={(event) => {
                    setCourse((prevState) => ({
                        ...prevState,
                        title: event.target.value
                    }))
                }} />
            <TextField label={"description"}
                onChange={(event) => {
                    setCourse((prevState) => ({
                        ...prevState,
                        description: event.target.value
                    }))
                }} />
            <TextField label={"image link"}
                onChange={(event) => {
                    setCourse((prevState) => ({
                        ...prevState,
                        imageLink: event.target.value
                    }))
                }} />
            <TextField label={"price"}
                onChange={(event) => {
                    setCourse((prevState) => ({
                        ...prevState,
                        price: event.target.value
                    }))
                }} />
            <Button variant="contained"
                style={{ width: "25%", borderRadius: 20 }}
                onClick={handleClick}>Save</Button>
        </Card>
    </div>
};
export default AddEditCourse;