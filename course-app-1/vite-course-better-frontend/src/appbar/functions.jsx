import axios from "axios";

export async function fetchUsers() { 
    let res;
    try {
        res = await axios.get("http://localhost:3000/users/userList")
    }
    catch (error) {
        console.log(error);
    }
    return res.data.userList;
}

export function logout(navigate) {
    localStorage.clear(); 
    navigate("/");
    location.reload();
}

export async function adminData() {
    let token = localStorage.getItem("token")
    let res;
    try {
        res = await axios.get("http://localhost:3000/admin/me", {
            headers: {
                authorization: "Bearer " + token
            }
        });


    }
    catch (error) { 
        console.log(error)
    }
    return res.data.admin;

}
export async function userData() {
    let token = localStorage.getItem("token")
    let res;
    try {
        res = await axios.get("http://localhost:3000/users/me", {
            headers: {
                authorization: "Bearer " + token
            }
        });


    }
    catch (error) {
        console.log(error)
    }
    return res.data.user;

}