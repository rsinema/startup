function login() {
    const nameEl = document.querySelector("#username");
    console.log(nameEl)
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "pong.html";
}
  