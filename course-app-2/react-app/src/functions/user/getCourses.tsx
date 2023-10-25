import { BASE_URL } from "../../config";
import GetCourses from "../../components/getCourses";

function GetCoursesUser() {
    return <div>
        <GetCourses url={`${BASE_URL}/user/courses`} action="Buy" reqType="get" ></GetCourses>
    </div>
}
export default GetCoursesUser; 