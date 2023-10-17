import Login from "../../components/signup-login";
import { BASE_URL } from "../../config";

function UserLogin() {
    return <div style={{ marginTop: 120 }}>
        <Login url={`${BASE_URL}/user/login`} action={"Login"} />
    </div>
}
export default UserLogin;