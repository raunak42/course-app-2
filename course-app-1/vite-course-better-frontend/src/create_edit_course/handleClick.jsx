import axios from "axios";

export async function ClickCreate(title, description, price, imageLink) {
    try {
        let token = localStorage.getItem("token");
        const res = await axios.post("http://localhost:3000/admin/courses", {
            title: title,
            description: description,
            imageLink: imageLink,
            price: price
        },
            {
                headers: {
                    authorization: "Bearer " + token /*every backend function that has authenticateJwt 
            as an argument will need "authorization" header sent from the frontend*/
                }
            });
        let data = res.data;
        alert(data.message);
    } catch (error) {
        let errMsg = "you have been signed out";
        alert(errMsg);
    }
}

export async function ClickEdit(title, description, price, imageLink, courseId) {

    try {
        let token = localStorage.getItem("token");
        const res = await axios.put("http://localhost:3000/admin/courses/" + courseId, {
            title: title,
            description: description,
            imageLink: imageLink,
            price: price
        },
            {
                headers: {
                    authorization: "Bearer " + token /*every backend function that has authenticateJwt 
    as an argument will need "authorization" header sent from the frontend*/
                }
            }
        );
        let data = res.data;
        alert(data.message+" hi");
        location.reload();
    }
    catch (error) {
        let errMsg = error.response.data.message;
        alert(errMsg);
    }

}