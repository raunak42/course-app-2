import { Card, Typography, Box, CardMedia, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import fetchCourses from "../fetchCourses"; 


function Courses(props) {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);

    let role = props.role;

    useEffect(() => { 
        async function fetchData() {
            const courses = await fetchCourses(role, navigate);
            setCourses(courses);
        }

        fetchData();
    }, []);
 
    if (courses == null) {
        return <div>
            Loading courses...
            <CircularProgress></CircularProgress>
        </div>
    }
    else {
        return <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {
                courses.map((course) => (
                    <CourseCard id={course._id} key={course._id} course={course}></CourseCard>
                ))
            }
        </div>
    }


}



export default Courses; 


