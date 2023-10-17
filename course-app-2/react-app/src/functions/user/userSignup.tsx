import Signup from "../../components/signup-login";
import { BASE_URL } from "../../config";

function UserSignup() {
    return <div style={{ marginTop: 120 }}>
        <Signup url={`${BASE_URL}/user/signup`} action={"Signup"} />
    </div>
}
export default UserSignup;