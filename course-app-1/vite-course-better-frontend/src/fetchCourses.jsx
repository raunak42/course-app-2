import axios from "axios";

async function fetchCourses(role, navigate) {
    let res;
    try {
        const token = localStorage.getItem("token");
        res = await axios.get(role === "admin" ? "http://localhost:3000/admin/courses" : "http://localhost:3000/users/courses", {
            headers: {
                authorization: "Bearer " + token
            }
        });
    } catch (error) {
        console.log(error);
        const errMsg = error.response.data.message;
        alert(errMsg);
        if (error.response.status = 403) {
            if (role === "admin") {
                navigate("/admin/login")
            } else if (role === "user") {
                navigate("/user/login")
            }
        }
    }

    return res.data.courses;
}

export default fetchCourses;