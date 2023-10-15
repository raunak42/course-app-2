import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { CircularProgress } from "@mui/material";
import fetchCourses from "../fetchCourses";
import { useNavigate } from "react-router-dom";

async function fetchMyCourses( navigate) {
    let res;
    try {
        const token = localStorage.getItem("token");
        res = await axios.get("http://localhost:3000/users/purchasedCourses", {
            headers: {
                authorization: "Bearer " + token
            }
        });
    } catch (error) {
        console.log(error);
        const errMsg = error.response.data.message;
        alert(errMsg);
        if (error.response.status = 403) {
            navigate("/user/login")
        }
    }
    return res.data.Purchased_Courses;

}
function MyCourses() {
    let role = "user";
    const navigate = useNavigate(); 
    const [courses, setCourses] = useState(null);
    const [myCourses, setMyCourses] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const courses1 = await fetchMyCourses( navigate);
            const courses2 = await fetchCourses(role, navigate);

            setMyCourses(courses1);
            setCourses(courses2);

        };
        fetchData();
    }, []);

    if (courses == null && myCourses == null) { 
        return <div>
            Loading courses...
            <CircularProgress></CircularProgress>
        </div>
    } else if (courses !== null && myCourses !== null) {
        let arr = [];

        let dash = "-";
        let line = "";
        for (var i = 0; i < 267; i++) {
            line = line + dash;
        }

        for (var i = 0; i < courses.length; i++) {
            for (var j = 0; j < myCourses.length; j++) {
                if (myCourses[j] == courses[i]._id) {
                    arr.push(courses[i])
                }
            }
        }
        //let common = courses.filter((t) => myCourses.includes(t._id));
        //console.log("common", common);

        console.log(arr);

        return <div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {
                    arr.map((course) => (
                        <CourseCard id={course._id} key={course._id} course={course}></CourseCard>
                    ))
                }
            </div>
        </div>


    }

}
export default MyCourses;