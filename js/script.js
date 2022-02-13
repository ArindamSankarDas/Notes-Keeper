const addButton = document.querySelector("#add");

const updateLSdata = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((currVal) => {
    return notes.push(currVal.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = ` 
	<div class="operation">
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
        <button class="edit"><i class="fas fa-edit"></i></button>
    </div>

      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  // getting the references
  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  // deleting the node
  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLSdata();
  });

  //  toggle using the edit button
  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.value = text;
  mainDiv.innerHTML = text;

  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSdata();
  });

  // it appends a node as a last child of a node
  document.body.appendChild(note);
};

// getting the data back from the local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());
