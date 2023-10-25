import axios from "axios";
import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { course } from "../functions/admin/editCourse";
import { CircularProgress } from "@mui/material";
import CourseCard from "./courseCard";

type personCoursesProps = {
    url: string,
    allCoursesUrl: string,
    action: string
}
function PersonCourses(props: personCoursesProps) {
    console.log(props.allCoursesUrl)
    const [data, setData] = useState(null)
    const [courses, setCourses] = useState<course[] | []>([])
    const [myCourses, setMyCourses] = useState<string[]>([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getMyCourses = async () => {
            const res = await axios.get(props.url, {
                headers: { authorization: `Bearer ${token}` }
            })
            setData(res.data)
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

    if (courses.length > 0 && myCourses.length > 0) {
        console.log(courses)
        console.log(myCourses)
        const matches = courses.filter((course) => myCourses.includes(course._id));
        console.log(matches)
        return <div style={{
            display: "flex", flexWrap: "wrap", justifyContent:"center"
        }}>
            {
                matches.map((course) => {
                    return <CourseCard course={course} action={props.action} buttonUrl={``} ></CourseCard>
                })
            }
        </div>
    } else {
        return <div>
            <CircularProgress></CircularProgress>
        </div>
    }





}
export default PersonCourses;