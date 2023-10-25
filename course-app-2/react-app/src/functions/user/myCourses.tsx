import PersonCourses from "../../components/personCourses";
import { BASE_URL } from "../../config";

function MyCourses() {
    return <div >
        <PersonCourses url={`${BASE_URL}/user/myCourses`} allCoursesUrl={`${BASE_URL}/user/courses`} action={"View Details"}></PersonCourses>
    </div>
}
export default MyCourses;  