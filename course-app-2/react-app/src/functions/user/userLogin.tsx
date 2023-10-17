import Login from "../../components/signup-login";
import { BASE_URL } from "../../config";

function UserLogin() {
    return <Login url={`${BASE_URL}/user/login`} action={"Login"} />
}
export default UserLogin;