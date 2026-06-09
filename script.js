let notesData = JSON.parse(localStorage.getItem("notes")) || [];

const addBtn = document.querySelector("#ADD_TASK_BTN");
const modal = document.querySelector("#modal");
const saveBtn = document.querySelector("#saveBtn");
const notes = document.querySelector("#notes");
const viewModal = document.querySelector("#viewModal");
const deleteBtn = document.querySelector("#deleteBtn");
const cancelBtn = document.querySelector("#cancel");
const closeModalBtn = document.querySelector("#closeModal"); // Fix 4: new close btn

let selectedNote = null;
let selectedIndex = null;

// Fix 5: saveToStorage was called but never defined
function saveToStorage() {
    localStorage.setItem("notes", JSON.stringify(notesData));
}

function createNote(title, body, index) {
    const note = document.createElement("div");
    note.classList.add("notes_item");
    note.innerHTML = `
        <h5><i class="fa-solid fa-note-sticky"></i> ${title}</h5>
        <p>${body}</p>
    `;
    note.addEventListener("click", () => {
        selectedNote = note;
        selectedIndex = index;
        document.querySelector("#viewTitle").textContent = title;
        document.querySelector("#viewBody").textContent = body;
        viewModal.classList.remove("hidden");
    });
    notes.appendChild(note);
}

function renderNotes() {
    notes.innerHTML = "";
    notesData.forEach((note, index) => {
        createNote(note.title, note.body, index);
    });
}

renderNotes();

addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

// Fix 4: close the add-note modal without saving
closeModalBtn.addEventListener("click", () => {
    document.querySelector("#noteTitle").value = "";
    document.querySelector("#noteBody").value = "";
    modal.classList.add("hidden");
});

saveBtn.addEventListener("click", () => {
    const title = document.querySelector("#noteTitle").value;
    const body = document.querySelector("#noteBody").value;

    if (!title.trim() || !body.trim()) {
        alert("Fill all fields");
        return;
    }

    notesData.push({ title, body });
    saveToStorage();
    renderNotes();

    document.querySelector("#noteTitle").value = "";
    document.querySelector("#noteBody").value = "";
    modal.classList.add("hidden");
});

deleteBtn.addEventListener("click", () => {
    if (selectedIndex !== null) {
        notesData.splice(selectedIndex, 1);
        saveToStorage();
        renderNotes();
        selectedNote = null;
        selectedIndex = null;
    }
    viewModal.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
    viewModal.classList.add("hidden");
});
