const values = document.querySelectorAll(".big-text");
const canvases = document.querySelectorAll("canvas");
const contexts = [];
const colors = ["red", "blue", "yellow", "green"];

canvases.forEach((canvas, i) => {
    contexts.push(canvas.getContext("2d"));
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    contexts[i].strokeStyle = colors[i];
    contexts[i].lineWidth = 5;
});

let startChange = false;

function addZero(value) {
    return (value + "0").length == 2 ? "0" + value : value;
}

function onChange(e, bool) {
    return bool && startChange ? e.classList.add("changed") : e.classList.remove("changed");
}

function calculate() {
    contexts.forEach((context, i) => {
        context.clearRect(0, 0, canvases[i].width, canvases[i].height);
    });

    const curDate = new Date();
    const endDate = new Date(curDate.getFullYear()+1, 0, 1, 0, 0, 0);
    let diff = endDate - curDate;
    const newValues = [];
    
    newValues.push(Math.floor(diff / (1000 * 60 * 60 * 24)));
    diff %= 1000 * 60 * 60 * 24;
    
    newValues.push(Math.floor(diff / (1000 * 60 * 60)));
    diff %= 1000 * 60 * 60;
    
    newValues.push(Math.floor(diff / (1000 * 60)));
    diff %= 1000 * 60;
    
    newValues.push(Math.floor(diff / 1000));

    values.forEach((value, i) => {
        const oldValue = value.textContent;
        value.textContent = addZero(newValues[i]);
        onChange(value, oldValue != value.textContent);
    });

    startChange = true;
    const bases = [366, 24, 60, 60];

    contexts.forEach((context, i) => {
        context.beginPath();
        context.arc(canvases[i].width/2, canvases[i].height/2, canvases[i].width/2 - 2, 0, (newValues[i] / bases[i]) * 2 * Math.PI);
        context.stroke();
    });
}

calculate();
setInterval(calculate, 500);