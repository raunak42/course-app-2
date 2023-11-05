import PersonCourses from "../../components/personCourses";
import { BASE_URL } from "../../config";

function MyCoursesAdmin() {
    return <div>
        <PersonCourses url={`${BASE_URL}/admin/myCourses`} allCoursesUrl={`${BASE_URL}/admin/courses`} action="Edit"></PersonCourses>
    </div>
}
export default MyCoursesAdmin;  