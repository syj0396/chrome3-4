/*
const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
*/

//form태그 사용x
/*
const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");

function onLoginBtnClick() {
    //console.dir(loginInput); 콘솔 창에서 사용자의 입력 값을 가지고 있는 항목?이 value임을 알 수 있음.
    const userName = loginInput.value;

    if (userName === "") {
        alert("Please write your name");
    } else if (userName.length > 15) {
        alert("Your name is too long.");
    }
}

loginButton.addEventListener("click", onLoginBtnClick);
*/



//form태그 사용 (4.2) + 4.3 + saving
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username"; //같은 string이 반복될 때 실수 방지 위해 const 변수에 저장.

//이 function이 하나의 argument를 받도록 하고 그걸 JS에 넘겨줌.
//그 argument에는 발생한 일에 대해 우리가 필요로 할만한 정보가 담겨 있음.
//우리는 그 argument만 매개변수로 명시해주면 됨. 그럼 그 정보들을 사용할 수 있음.
function onLoginSubmit(event) {
    event.preventDefault(); //브라우저의 기본 동작(여기선 페이지 새로고침)이 실행되지 않게 함.
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const typedUsername = loginInput.value;
    localStorage.setItem(USERNAME_KEY, typedUsername); //localStage에 key: value 형태로 저장.
    paintGreetings(typedUsername);
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}


const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}
