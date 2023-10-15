import { useEffect, useState } from "react";
import CourseCard from "../courses/CourseCard";
import CreateOrEditCourse from "./CreateOrEditCourse";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Grid, Typography } from "@mui/material";
import fetchCourses from "../fetchCourses";

function SendCourseAsProp() {
    const navigate = useNavigate();
    let { courseId } = useParams();
    const [courses, setCourses] = useState(null);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const role = "admin";
        async function fetchData() {
            const courses = await fetchCourses(role, navigate);
            setCourses(courses);
        }
        fetchData();
    }, []);

    if (courses == null && course == null) {
        return <div>
            <CircularProgress></CircularProgress>
        </div>
    }
    else if (courses !== null && course == null) {
        setCourse(courses.find((t) => t._id === courseId));
    }
    else if (course) {
        return <div>
            <GrayTopper title={course.title}></GrayTopper> 
            <Grid container>
                <Grid item  lg={8} md={12} sm={12}  >
                    <div style={{ marginTop:-50 ,marginBottom: 100 }}>
                        <CreateOrEditCourse course={course} action="edit"></CreateOrEditCourse>
                    </div>

                </Grid>
                <Grid item lg={4} md={12} sm={12} >
                    <div style={{ marginTop: 15, display: "flex", justifyContent: "center" }}>
                        <CourseCard id={course._id} course={course}></CourseCard>
                    </div>
                </Grid>
            </Grid>

        </div>
    }



}

function GrayTopper({ title }) { 
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -140 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                {title}
            </Typography>
        </div>
    </div>
}
export default SendCourseAsProp;