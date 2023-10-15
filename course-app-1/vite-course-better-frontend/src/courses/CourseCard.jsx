import { Card, Typography, Box, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BuyButton, EditButton } from "./Buttons";



function CourseCard(props) { 
    const navigate = useNavigate();
    const courseId = props.id;
    const renderBuyButton = () => BuyButton(courseId, props);
    const renderEditButton = () => EditButton(courseId, navigate);  

    return <Card
        style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            backgroundColor: "#FAF0E6", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            
        }}>
        <Typography textAlign={"center"} variant="h6">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
        <Box display="flex" justifyContent="center">
            <Card style={{
                border: '',
                width: 290,
                marginBottom: 5.4

            }}>
                <CardMedia
                    component="img"
                    src={props.course.imageLink}
                    style={{
                        width: 300,
                        height: '100%',
                        margin: 'auto',
                    }}
                />
            </Card>
        </Box>
        <div>
            {renderBuyButton()}
            {renderEditButton()}
        </div>
    </Card>
}

export default CourseCard;