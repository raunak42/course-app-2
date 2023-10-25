import { useNavigate, useParams } from "react-router-dom";
import AddEditCourse from "../../components/addCourse-editCourse";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { incomingCourseState } from "../../store/atoms/inComingCourse";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

export interface course {
    _id: string,
    title: string,
    description: string,
    imageLink: string,
    price: number,
    published: boolean
}

function EditCourse() {
    const navigate = useNavigate();

    const [course, setCourse] = useRecoilState<course>(incomingCourseState)
    const token = localStorage.getItem("token");
    const { courseId } = useParams();
    const [res, setRes] = useState<any>();
    const [courses, setCourses] = useState<course[] | []>([])

    useEffect(() => {   //always use useEffect independantly within the main function

        async function fetchData() {
            const res = await axios.get(`${BASE_URL}/admin/courses`, { headers: { authorization: `Bearer ${token}` } });
            setRes(res);
            setCourses(res.data.courses);
            const thisCourse = courses.find(t => t._id === courseId);
            if (thisCourse !== undefined) {
                setCourse(thisCourse)
            } else {
                setCourse({
                    _id: '',
                    title: '',
                    description: '',
                    imageLink: '',
                    price: 0,
                    published: false
                });
            }
        };
        fetchData();
    }, [res, courseId]);


    if (courses.length > 0 && course._id !== "") {
        return <div style={{ marginTop: 120 }}>
            <AddEditCourse action="Edit" reqType="put" url={`${BASE_URL}/admin/course/${courseId}`}></AddEditCourse>
        </div>
    } else {
        return <div style={{ display: 'flex', justifyContent: "center", marginTop: 50 }}>
            <CircularProgress style={{ color: "primary" }} size={80} ></CircularProgress>
        </div>
    }

}

export default EditCourse;