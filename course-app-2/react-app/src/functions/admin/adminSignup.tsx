import Signup from "../../components/signup-login";
import { BASE_URL } from "../../config";

function AdminSignup() {
    return <div style={{marginTop:120}}>
        <Signup url={`${BASE_URL}/admin/signup`} action={"Signup"} role="admin" />
    </div>
}

export default AdminSignup;
