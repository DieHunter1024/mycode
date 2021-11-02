const utils = new Utils();
const baseUrl = "http://127.0.0.1:2048/";
function init() {
  submit.addEventListener("click", handlerSubmitClick);
  initInfo();
}
function handlerSubmitClick() {
  const usernameValue = username.value,
    passwordValue = password.value,
    machineIdValue = machineId.value;
  usernameValue &&
    passwordValue &&
    machineIdValue &&
    utils
      .myAjax({
        method: "get",
        url: baseUrl + "userLogin",
        data: {
          username: usernameValue,
          password: passwordValue,
          machineId: machineIdValue,
        },
      })
      .then((result) => {
        if (result.state) {
          localStorage.setItem("username", usernameValue);
          localStorage.setItem("password", passwordValue);
          localStorage.setItem("machineId", machineIdValue);
        }
        console.log(result);
      })
      .catch((err) => {});
}
function initInfo() {
  username.value = localStorage.getItem("username");
  password.value = localStorage.getItem("password");
  machineId.value = localStorage.getItem("machineId");
}
