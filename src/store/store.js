import {makeAutoObservable, toJS} from "mobx";
import axios from "axios";

class Store {
    Introduction = "Introduction";
    Devices = "Devices";
    Questions = "Questions";
    Description = "Description";
    currentComponent = "Introduction";
    showButton = true;
    count = 0;
    questions = {};

    constructor() {
        makeAutoObservable(this);
    }

    auth = async () => {
        const data = {
            Login: "77086930773",
            RoleId: "5d5b8590cc091303c4acfb10",
            Password: "12345678"
        }
        const result = await axios.post("/api/authentication/Login", data);
        axios.defaults.headers.common["Authorization"] = result.data.token;
    }

    handleSubmitPush = async (data) => {
        const dataForm = new FormData();
        // dataForm.append("image", data.Image);
        // dataForm.append("titleKk", data.title.kk);
        // dataForm.append("titleRu", data.title.ru);
        // dataForm.append("titleEn", data.title.en);
        // dataForm.append("bodyKk", data.body.kk);
        // dataForm.append("bodyRu", data.body.ru);
        // dataForm.append("bodyEn", data.body.en);
        // dataForm.append("category", data.category);
        dataForm.append("title", JSON.stringify(data.title));
        dataForm.append("body", JSON.stringify(data.body));
        dataForm.append("image", data.Image);
        console.log("Something");
        console.log(data.title);
        try {
            const result = await axios({
                method: "POST",
                url: "http://localhost:5000/api/push/pushNotifications",
                data: dataForm,
                headers: {"Content-Type": "multipart/form-data"}
            });
            this.pushStatus = result.status;
        } catch (e) {
            console.log(e);
        }
    }
    handleSubmit = async (data) => {
        let error;
        try {
            const result = await axios.post("/api/auth", data).catch(err => {
                if (err.response.status != 200) {
                    console.log(err.response, "err");
                    this.status = err.response.status
                    return;
                }
            })
            console.log(result.data);
            this.status = result.status;
            const token = result.data.token.split(" ")[1];
            if (!token.isEmpty) {
                localStorage.setItem("jwtToken", token);
                axios.defaults.headers.common["Authorization"] = token;
                this.token = token;
                this.isAuthenticated = true;
                console.log(this.isAuthenticated)
            } else {
                this.isAuthenticated = false;
            }
        } catch (e) {
            error = e;
        }
    };
    getCategories = async () => {
        const result = await axios.get("/api/push");
        console.log(result, "result");
        this.categories = result.data;
        console.log(this.categories)
    };
    getDescription = async () => {
        const result = await axios({
                method: "get",
                url: "https://dashboard.curs.kz:8023/api/Tests/Info?id=120521",
                headers: {'Access-Control-Allow-Origin': "*"},
                mode: 'cors'
            })
        ;
        console.log(result);
    }
}

export default new Store();