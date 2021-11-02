const utils = new Utils();
const baseUrl = "http://127.0.0.1:2048/";
function init() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((_) => {
    _.addEventListener("click", handlerSubmitClick);
  });
  initInfo();
}
function handlerSubmitClick(e) {
  const usernameValue = username.value,
    passwordValue = password.value,
    machineIdValue = machineId.value;
  usernameValue &&
    passwordValue &&
    machineIdValue &&
    utils
      .myAjax({
        method: "get",
        url: baseUrl + "command",
        data: {
          username: usernameValue,
          password: passwordValue,
          machineId: machineIdValue,
          type: this.id,
        },
      })
      .then((result) => {
        showMsg({ content: result.msg });
        if (!result.state) {
          return;
        }
        switch (result.type) {
          case "login":
            localStorage.setItem("username", usernameValue);
            localStorage.setItem("password", passwordValue);
            localStorage.setItem("machineId", machineIdValue);
            break;
          default:
            break;
        }
      })
      .catch((err) => {});
}
function initInfo() {
  username.value = localStorage.getItem("username");
  password.value = localStorage.getItem("password");
  machineId.value = localStorage.getItem("machineId");
}
