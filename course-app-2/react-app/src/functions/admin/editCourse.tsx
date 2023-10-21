import { useNavigate, useParams } from "react-router-dom";
import AddEditCourse from "../../components/addCourse-editCourse";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { incomingCourseState } from "../../store/atoms/inComingCourse";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

interface course {
    _id: string | undefined,
    title: string,
    description: string,
    imageLink: string,
    price: number,
    published: boolean
}

function EditCourse() {
    const navigate = useNavigate();

    const [course, setCourse] = useRecoilState(incomingCourseState)

    const token = localStorage.getItem("token");
    const { courseId } = useParams();
    const [res, setRes] = useState<any>();
    const [courses, setCourses] = useState<course[] | []>([]);

    const [msg, setMsg] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [alertError, setAlertError] = useState(false)


    useEffect(() => {   //always use useEffect independantly within the main function
        async function fetchData() {
            const res = await axios.get(`${BASE_URL}/admin/courses`, { headers: { authorization: `Bearer ${token}` } });
            setRes(res);
            setCourses(res.data.courses);
        };
        fetchData();
    }, []);

    useEffect(() => {   //why useEffect? because you are updating state of course (setCourse) using data coming from outside.
        if (res) {
            if (res.data.courses) {
                if (courses.length > 0) {
                    const thisCourse = courses.find(t => t._id === courseId);
                    if (thisCourse !== undefined) {
                        setCourse(thisCourse)
                    }
                }
            } else {
                setAlertError(true)
                setShowSnackbar(true)
                setMsg(res.data.message)
                setTimeout(() => {
                    setShowSnackbar(false)
                    navigate("/admin/login")
                }, 3000);

            }
        }
    }, [res])


    if (res) {
        if (course._id !== "") {
            return <div style={{ marginTop: 120 }}>
                <AddEditCourse action="Edit" reqType="put" url={`${BASE_URL}/admin/course/${courseId}`}></AddEditCourse>
                <Snackbar
                    open={showSnackbar}

                    anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                    {
                        alertError ?
                            <Alert variant="outlined" severity="error" style={{ borderRadius: 25 }}>
                                {msg}
                            </Alert>
                            :
                            <Alert severity="success" variant="outlined" style={{ borderRadius: 25 }}>
                                {msg}
                            </Alert>

                    }
                </Snackbar>
            </div>
        }
    } else {
        return <div style={{ display: 'flex', justifyContent: "center", marginTop: 50 }}>
            <CircularProgress style={{ color: "primary" }} size={80} ></CircularProgress>
        </div>
    }

}

export default EditCourse;