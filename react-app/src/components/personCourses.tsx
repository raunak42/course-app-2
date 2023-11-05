import axios from "axios";
import { useEffect, useState } from "react";
import { course } from "../functions/admin/editCourse";
import { CircularProgress, Typography } from "@mui/material";
import CourseCard from "./courseCard";

type personCoursesProps = {
    url: string,
    allCoursesUrl: string,
    action: string
}
function PersonCourses(props: personCoursesProps) {
    console.log(props.allCoursesUrl)
    const [courses, setCourses] = useState<course[] | null>(null)
    const [myCourses, setMyCourses] = useState<string[] | null>(null)
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getMyCourses = async () => {
            const res = await axios.get(props.url, {
                headers: { authorization: `Bearer ${token}` }
            })
            setMyCourses(res.data.myCourses)
        }
        getMyCourses();
        const getAllCourses = async () => {
            const res = await axios.get(props.allCoursesUrl, {
                headers: { authorization: `Bearer ${token}` }
            })
            setCourses(res.data.courses)
        }
        getAllCourses();
    }, [])

    if (courses !== null && myCourses !== null) {
        console.log(courses)
        console.log(myCourses)
        const matches = courses.filter((course) => myCourses.includes(course._id));
        if (matches.length > 0) {
            console.log(matches)
            return <div style={{
                display: "flex", flexWrap: "wrap", justifyContent: "center"
            }}>
                {
                    matches.map((course) => {
                        return <CourseCard course={course} action={props.action} buttonUrl={``} ></CourseCard>
                    })
                }
            </div>
        } else {
            let text;
            if (props.action === "Edit") {
                text = "created"
            } else {
                text = "purchased"
            }
            return <div>{
                <Typography variant="h3" textAlign={"center"} style={{ marginTop: 40 }}>
                    You have not {text} any courses.
                </Typography>}
            </div>
        }

    } else {
        return <div>
            <CircularProgress></CircularProgress>
        </div>
    }





}
export default PersonCourses;