import UserApi from "./api/user";

(new UserApi).getUserInfo().then(res => console.log(res))