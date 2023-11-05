import { BASE_URL } from "../../config";
import GetCourses from "../../components/getCourses";

function GetCoursesAdmin() {
    return <div>
        <GetCourses url={`${BASE_URL}/admin/courses`} action="Edit" reqType="get"></GetCourses>
    </div>
}
export default GetCoursesAdmin;