document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("note-input");
  const saveBtn = document.getElementById("save-btn");
  const exportBtn = document.getElementById("export-btn");
  const notesList = document.getElementById("notes-list");
  const searchInput = document.getElementById("search-input");

  const loadNotes = () => {
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      renderNotes(notes);
    });
  };

  const saveNote = () => {
    const newNote = noteInput.value.trim();
    if (!newNote) return alert("Note cannot be empty!");

    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      notes.push(newNote);
      chrome.storage.local.set({ notes }, () => {
        noteInput.value = "";
        loadNotes();
      });
    });
  };

  const deleteNote = (index) => {
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      notes.splice(index, 1);
      chrome.storage.local.set({ notes }, loadNotes);
    });
  };

  const renderNotes = (notes) => {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const noteItem = document.createElement("li");

      const noteText = document.createElement("span");
      noteText.textContent = note;
      noteText.addEventListener("click", () => editNote(index, note));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteNote(index));

      noteItem.appendChild(noteText);
      noteItem.appendChild(deleteBtn);
      notesList.appendChild(noteItem);
    });
  };

  const editNote = (index, currentNote) => {
    const newNote = prompt("Edit your note:", currentNote);
    if (newNote !== null && newNote.trim() !== "") {
      chrome.storage.local.get(["notes"], (result) => {
        const notes = result.notes || [];
        notes[index] = newNote.trim();
        chrome.storage.local.set({ notes }, loadNotes);
      });
    }
  };

  const exportNotes = () => {
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      const blob = new Blob([notes.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "notes.txt";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const searchNotes = () => {
    const query = searchInput.value.toLowerCase();
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      const filteredNotes = notes.filter((note) =>
        note.toLowerCase().includes(query)
      );
      renderNotes(filteredNotes);
    });
  };

  saveBtn.addEventListener("click", saveNote);
  exportBtn.addEventListener("click", exportNotes);
  searchInput.addEventListener("input", searchNotes);

  loadNotes();
});
