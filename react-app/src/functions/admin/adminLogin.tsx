import Login from "../../components/signup-login";
import { BASE_URL } from "../../config.js";

function AdminLogin() {
    return <div style={{marginTop:120}}>
        <Login url={`${BASE_URL}/admin/login`} action={"Login"} role="admin" />
    </div>
}
export default AdminLogin;