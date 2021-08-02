const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const rectangle = document.getElementById("jsRec");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    if (filling === false) {
        painting = true;
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

function drawRectangle() {
    const inputWidth = prompt('사각형의 가로 길이를 입력하세요');
    const inputHeight = prompt('사각형의 세로 길이를 입력하세요');
    ctx.fillRect(50, 50, inputWidth, inputHeight);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if (rectangle) {
    rectangle.addEventListener("click", drawRectangle);
}

const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer-form input");

const ANSWER_KEY = "answer";

const savedAnswer = localStorage.getItem(ANSWER_KEY);

function checkAnswer(event) {
    event.preventDefault();
    console.log(answerInput.value);
    if (answerInput.value === localStorage.getItem(ANSWER_KEY)) {
        alert("정답입니다!");
        localStorage.removeItem(ANSWER_KEY);
        //window.location.reload();
        answerInput.placeholder = "출제자는 정답 입력!";
        answerInput.value = null;
    } else {
        answerInput.value = null;
        alert("틀렸어요ㅜ 다시 시도해주세요");
        
    }
}

function onAnswerSubmit(event) {
    event.preventDefault();
    const typedAnswer = answerInput.value;
    answerInput.value = null;
    answerInput.placeholder = "정답이 무엇일까요?";
    localStorage.setItem(ANSWER_KEY, typedAnswer);
    answerForm.removeEventListener("submit", onAnswerSubmit);
    answerForm.addEventListener("submit", checkAnswer);
}


if (savedAnswer === null) {
    answerInput.placeholder = "출제자는 정답 입력!";
    answerForm.addEventListener("submit", onAnswerSubmit);
} else {
    answerInput.placeholder = "정답이 무엇일까요?";
    answerForm.addEventListener("submit", checkAnswer);
}