import Signup from "../../components/signup-login";
import { BASE_URL } from "../../config";

function AdminSignup() {
    return <div>
        <Signup url={`${BASE_URL}/admin/signup`} action={"Signup"} />
    </div>
}

export default AdminSignup;
