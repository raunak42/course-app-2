import axios from "axios";

export async function AdminSignup(username, password, navigate) { 
    try {
        const res = await axios.post("http://localhost:3000/admin/signup", {
            username: username,
            password: password
        })
        let data = res.data; 
        console.log(data);
        alert(data.message);  
        navigate("/admin/login");
        location.reload();
    } catch (error) {
        const errMsg = error.response.data.message;
        alert(errMsg);
    }
}
export async function UserSignup(username, password, navigate) {
    try {
        const res = await axios.post("http://localhost:3000/users/signup", {
            username: username,
            password: password
        })
        let data = res.data;
        alert(data.message);
        navigate("/user/login");
        location.reload()
    } catch (error) {
        const errMsg = error.response.data.message;
        alert(errMsg);
    }
}
export async function AdminLogin(username, password, navigate) {
    try {
        const res = await axios.post("http://localhost:3000/admin/login", {}, {
            headers: {
                username: username,
                password: password
            }
        })
        let data = res.data;
        console.log(data);
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/admin/create");
        location.reload();
    } catch (error) {
        const errMsg = error.response.data.message;
        alert(errMsg);
    }

}
export async function UserLogin(username, password, navigate) {
    try {
        const res = await axios.post("http://localhost:3000/users/login", {}, {
            headers: {
                username: username,
                password: password
            }
        })
        let data = res.data;
        localStorage.setItem("token", data.token);  
        alert(data.message);
        navigate("/user/courses");
        location.reload();
    } catch (error) {
        const errMsg = error.response.data.message;
        alert(errMsg);
    }
}

