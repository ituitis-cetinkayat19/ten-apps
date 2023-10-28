const password = document.querySelector(".password-value");
const copy = document.querySelector(".copy");
const length = document.querySelector(".length");
const checkBoxes = document.querySelectorAll("input[type='checkbox']");
const generate = document.querySelector(".generate");

let finalPw = "";
const allChars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789", "!@#$%^&*()_+="];
const allowedChars = [];

function setAllowed() {
    allowedChars.splice(0);
    for(let i = 0; i < checkBoxes.length; i++)
        if(checkBoxes[i].checked)
            allowedChars.push(allChars[i]);
};

function getChar(string) {
    return string[Math.floor(Math.random() * string.length)];
}

generate.addEventListener("click", () => {
    setAllowed();
    finalPw = "";
    if(!length.value || length.value == 0 || allowedChars.length == 0) return;
    for(let i = 0; i < length.value; i++) {
        finalPw += getChar(getChar(allowedChars));
    }
    password.textContent = finalPw;
});

copy.addEventListener("click", () => {
    if(password.textContent) {
        const textArea = document.createElement("textarea");
        textArea.value = password.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        
        document.execCommand("copy");
        textArea.remove();
        alert("Copied to clipboard!");
    }
});