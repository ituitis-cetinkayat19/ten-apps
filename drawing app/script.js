const canvas = document.querySelector("canvas.real");
const fake = document.querySelector("canvas.preview");
const tools = document.querySelectorAll(".tools .draw-type");
const colorBtn = document.querySelector(".tools .color");
const widthBtn = document.querySelector(".tools .width");
let isDrawing = false;
let lastX;
let lastY;
let drawStyle = "pencil";
let drawColor = "black";

//SET LINEWIDTH AND COLOR LEFT. 

function initCanvas(canvas) {
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 9 / 10;
    Object.assign(context, {lineWidth: 10, lineJoin: "round", lineCap: "round"});
    return context;
}

colorBtn.addEventListener("input", () => {
    drawColor = colorBtn.value;
    setColor(drawColor);
});

widthBtn.addEventListener("input", () => {
    setWidth(widthBtn.value);
});

const ctx = initCanvas(canvas);
const prevCtx = initCanvas(fake);

function setWidth(width) {
    ctx.lineWidth = width;
    prevCtx.lineWidth = width;
}

function setColor(color) {
    Object.assign(ctx, {strokeStyle: color, fillStyle: color});
    Object.assign(prevCtx, {strokeStyle: color, fillStyle: color});
    if(color != "white") {
        tools.forEach(tool => {
            tool.style.color = color;
        })
    }
}

tools.forEach(tool => {
    tool.addEventListener("click", function() {
        drawStyle = this.dataset.type;
        fake.style.display = drawStyle == "pencil" || drawStyle == "eraser" ? "none" : "block";
        setColor(drawStyle == "eraser" ? "white" : drawColor);
    });
})

canvas.addEventListener("mousemove", () => {
    if(isDrawing && (drawStyle == "pencil" || drawStyle == "eraser")) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        [lastX, lastY] = [event.offsetX, event.offsetY];
    }
});

function beginDraw(event) {
    isDrawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
}

function drawPreview(ctx) {
    ctx.beginPath();
    switch(drawStyle) {
        case "line":
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(event.offsetX, event.offsetY);
            break;
        case "rectangle":
            ctx.rect(lastX, lastY, event.offsetX - lastX, event.offsetY - lastY);
            break;
        case "circle":
            ctx.ellipse((lastX + event.offsetX) / 2, (lastY + event.offsetY) / 2, Math.abs(lastX - event.offsetX) / 2, Math.abs(lastY - event.offsetY) / 2, 0, 0, 2 * Math.PI);
            break;
        case "rectangleFill":
            ctx.rect(lastX, lastY, event.offsetX - lastX, event.offsetY - lastY);
            ctx.fill();
            return;
        case "circleFill":
            ctx.ellipse((lastX + event.offsetX) / 2, (lastY + event.offsetY) / 2, Math.abs(lastX - event.offsetX) / 2, Math.abs(lastY - event.offsetY) / 2, 0, 0, 2 * Math.PI);
            ctx.fill();
            return;
    }
    ctx.stroke();
}

canvas.addEventListener("mousedown", beginDraw);
canvas.addEventListener("mouseup", () => {isDrawing = false});
canvas.addEventListener("mouseout", () => {isDrawing = false});


function endPreview() {
    if(isDrawing) {
        isDrawing = false;
        drawPreview(ctx);
        prevCtx.clearRect(0, 0, fake.width, fake.height);
    }
}

fake.addEventListener("mousedown", beginDraw);
fake.addEventListener("mouseup", endPreview);
fake.addEventListener("mouseout", endPreview);

fake.addEventListener("mousemove", () => {
    if(isDrawing) {
        prevCtx.clearRect(0, 0, fake.width, fake.height);
        drawPreview(prevCtx);
    }
});