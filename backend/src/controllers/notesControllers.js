import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    console.time("get-notes");
    const notes = await Note.find().sort({ created: -1 });
    console.timeEnd("get-notes");
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const saveNote = await note.save();
    res.status(201).json({ message: "Note created successfully!", saveNote });
    console.log(title, content);
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updateNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully!" });
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note delete successfully!" });
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
