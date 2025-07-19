import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
const NoteDetailPage = () => {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNotes(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"></LoaderIcon>
      </div>
    );
  }
  const handleDelete = async () => {
    if (!window.confirm(" Are you sure you want delete this note")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Deleted note successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Deleted note failed");
    }
  };

  const handleSave = async () => {
    if (!notes.title.trim() || !notes.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, notes);
      toast.success("Update note successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Update note failed");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            {" "}
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Back to Notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={notes.title}
                  onChange={(e) =>
                    setNotes({ ...notes, title: e.target.value })
                  }
                ></input>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Content"
                  className="input input-bordered"
                  value={notes.content}
                  onChange={(e) =>
                    setNotes({ ...notes, content: e.target.value })
                  }
                ></input>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
