import Login from "../../components/signup-login";
import { BASE_URL } from "../../config";

function AdminLogin() {
    return <Login url={`${BASE_URL}/admin/login`} action={"Login"} />
}
export default AdminLogin;