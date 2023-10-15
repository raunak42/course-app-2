import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClickCreate, ClickEdit } from "./handleClick";


function CreateOrEditCourse(props) {
    const navigate = useNavigate();
    const { courseId } = useParams();
    let handleClick;
    let action = props.action;

    let a, b, c, d;
    if (action === "edit") {
        a = props.course.title;
        b = props.course.description;
        c = props.course.imageLink;
        d = props.course.price;
    }

    const [title, setTitle] = useState(action === "create" ? "" : a);
    const [description, setDescription] = useState(action === "create" ? "" : b);
    const [imageLink, setImageLink] = useState(action === "create" ? "" : c);
    const [price, setPrice] = useState(action === "create" ? "" : d);


    let CardTitle;
    if (action === "create") {
        CardTitle = "Create";
        handleClick = () => ClickCreate(title, description, price, imageLink);
    }
    else if (action === "edit") {
        CardTitle = "Edit";
        handleClick = () => ClickEdit(title, description, price, imageLink, courseId);
    }
    return <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{
                height: 435,
                width: 400,
                marginTop: 150,
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{ padding: 25 }}>
                    <Typography variant="h5" style={{ display: "flex", justifyContent: "center" }}>
                        {CardTitle} course:
                    </Typography>
                    <div style={{ marginTop: 15 }}>
                        <TextField autoFocus={true} defaultValue={title} label="Title" style={{ width: 300 }} onChange={(event) => {
                            setTitle(event.target.value)
                        }} ></TextField>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <TextField defaultValue={description} label="Description" style={{ width: 300 }} onChange={(event) => {
                            setDescription(event.target.value)
                        }}></TextField>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <TextField defaultValue={imageLink} label="Image link" style={{ width: 300 }} onChange={(event) => {
                            setImageLink(event.target.value)
                        }}></TextField>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <TextField defaultValue={price} label="Price" style={{ width: 300 }} onChange={(event) => {
                            setPrice(event.target.value)
                        }}></TextField>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" size="large" style={{ marginTop: 15 }} onClick={handleClick}>
                            {CardTitle}
                        </Button>
                    </div> 
                </div>
            </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" size="large" style={{ marginTop: 15 }} onClick={() => {
                navigate("/admin/courses");
            }}>
                View courses
            </Button>
        </div>
    </div>
}

export default CreateOrEditCourse;
