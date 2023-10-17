import Signup from "../../components/signup-login";
import { BASE_URL } from "../../config";

function UserSignup() {
    return <div>
        <Signup url={`${BASE_URL}/user/signup`} action={"Signup"} />
    </div>
}
export default UserSignup;