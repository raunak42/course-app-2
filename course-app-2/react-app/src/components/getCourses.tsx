import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../config"
import CourseCard from "./courseCard";
import { CircularProgress } from "@mui/material";
import { course } from "../functions/admin/editCourse";
import { propsCourse } from "./addCourse-editCourse";


interface thisProps extends propsCourse {
}

function GetCourses(props: thisProps) {
    const reqType = props.reqType;
    const [courses, setCourses] = useState<course[] | []>([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        const fetchData = async () => {
            const res = await axios[reqType](props.url, { headers: { authorization: `Bearer ${token}` } });
            const fetchedCourses: course[] = res.data.courses;
            setCourses(fetchedCourses)
        }
        fetchData();
    }, []);
    if (courses.length > 0) {
        return <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {
                courses.map((course) => {
                    return <CourseCard key={course._id} course={course} action={props.action} buttonUrl={``} ></CourseCard>
                })
            }
        </div>
    } else {
        return <div style={{ display: 'flex', justifyContent: "center", marginTop: 50 }}>
            <CircularProgress style={{ color: "primary" }} size={80} ></CircularProgress>
        </div>
    }
}

export default GetCourses;