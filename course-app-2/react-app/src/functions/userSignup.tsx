import Signup from "../components/signup";
import { BASE_URL } from "../config";

function UserSignup() {
    return <div>
        <Signup url={`${BASE_URL}/user/signup`} />
    </div>
}
export default UserSignup;