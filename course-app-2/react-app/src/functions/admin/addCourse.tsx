import AddEditCourse from "../../components/addCourse-editCourse";
import { BASE_URL } from "../../config";

function AddCourse() {
    return <div style={{ marginTop: 120 }}>
        <AddEditCourse action={"Add"} reqType={"post"} url={`${BASE_URL}/admin/addCourse`} />
    </div>
}
export default AddCourse;