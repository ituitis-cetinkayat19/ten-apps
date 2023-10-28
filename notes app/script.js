const noteContainer = document.querySelector(".note-container");
const addBtn = document.querySelector(".add");
const notes = JSON.parse(localStorage.getItem("notes")) || [];

function getIndex(parent, child) {
    for(let i = 0; i < parent.children.length; i++) {
        if(parent.children[i] == child)
            return i;
    }
    return -1;
}

function createNote() {
    const newNote = document.createElement("div");
    newNote.classList.add("notes");
    newNote.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="main hidden"></div>
        <textarea></textarea>
    `;
    const editBtn = newNote.querySelector(".edit");
    const deleteBtn = newNote.querySelector(".delete");
    const main = newNote.querySelector(".main");
    const textArea = newNote.querySelector("textarea");

    editBtn.addEventListener("click", () => {
        const index = getIndex(noteContainer, newNote);
        notes[index].text = textArea.value;
        localStorage.setItem("notes", JSON.stringify(notes));
        main.innerHTML = marked(textArea.value);
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        const index = getIndex(noteContainer, newNote);
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        newNote.remove();
    })

    window.addEventListener("mousemove", function() {
        newNote.style.width = textArea.style.width;
        newNote.style.height = textArea.style.height;
        main.style.height = textArea.style.height;
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    noteContainer.appendChild(newNote);

    return textArea;    
}

function loadNotes(notes) {
    notes.forEach(note => {
        const textArea = createNote();
        textArea.value = note.text;
    });
};

loadNotes(notes);

addBtn.addEventListener("click", () => {
    createNote();
    notes.push({"text":""});
    localStorage.setItem("notes", JSON.stringify(notes));
});
