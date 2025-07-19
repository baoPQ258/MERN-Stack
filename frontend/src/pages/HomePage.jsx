import { useEffect, useState } from "react";
import RateLimitedUI from "../component/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../component/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../component/NoteNotFound";
import Navbar from "../component/navbar";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        console.log(res.data);
      } catch (error) {
        console.log(" Error fetching notes", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setloading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI></RateLimitedUI>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            {" "}
            Loading Notes...
          </div>
        )}
        {notes.length === 0 && !isRateLimited && (
          <NotesNotFound></NotesNotFound>
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
              ></NoteCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
