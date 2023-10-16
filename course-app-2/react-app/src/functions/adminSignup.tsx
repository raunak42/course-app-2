import Signup from "../components/signup";
import { BASE_URL } from "../config";


function AdminSignup() {
    return <div>
        <Signup url={`${BASE_URL}/admin/signup`} />
    </div>
}

export default AdminSignup;
