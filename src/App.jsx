// 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  // const BACKEND_API = "https://notes-2-x7kd.onrender.com";
    let BACKEND_API = "http://localhost:4000";
  // State management
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [formData, setFormData] = useState({
    category: "Home",
    title: "",
    description: '',
    isCompleted: false
  });
  const [updateValue, setUpdateValue] = useState({
    title: "",
    description: ''
  });

  // Filter notes based on category, completion status, and search
  const getFilteredNotes = () => {
    let filtered = notes;

    // Filter by search
    if (search) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by completion status
    if (showOnlyCompleted) {
      filtered = filtered.filter(note => note.isCompleted === "true");
    }

    // Filter by category
    if (activeCategory !== 'all' && !showOnlyCompleted) {
      filtered = filtered.filter(note =>
        note.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    return filtered;
  };

  // Check authentication
  useEffect(() => {
    fetch(`${BACKEND_API}/check`, {
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          navigate('/login');
        }
        return res.json()
      })
      .then((data)=>{
        console.log(data)
      })
      .catch((err) => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate, BACKEND_API]);

  // Fetch notes
  useEffect(() => {
    fetch(`${BACKEND_API}/`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setNotes(data[0].notes);
      })
      .catch(err => console.error(err));
  }, [BACKEND_API]);

  // Handle note completion toggle
  const handleCompletionToggle = async (e) => {
    const isChecked = e.target.checked;
    const noteId = e.target.id;
    const myID = localStorage.getItem('myID');

    try {
      if (myID) {
        const res = await fetch(`${BACKEND_API}${myID}`, {
          method: "POST",
          body: JSON.stringify({ _id: noteId, check: isChecked }),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        });
        const data = await res.json();
        setNotes(data.notes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_API}/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setNotes(data.notes);
        setShowForm(false);
        setFormData({ category: "Home", title: "", description: '', isCompleted: false });
      })
      .catch(err => console.error(err));
  };

  // Handle edit mode
  const handleEditNote = (e) => {
    const noteId = e.target.getAttribute("name");
    const updatedNotes = notes.map((note) =>
      note._id === noteId ? { ...note, isEdit: true } : note
    );

    const noteToEdit = notes.find(note => note._id === noteId);
    if (noteToEdit) {
      setUpdateValue({
        title: noteToEdit.title,
        description: noteToEdit.description
      });
    }

    setNotes(updatedNotes);
  };

  // Handle note deletion
  const handleDeleteNote = (e) => {
   const ans =   confirm("Are You Sure ! ")
   if (!ans) {
    return  
   }
    const noteId = e.target.getAttribute("name");
    fetch(`${BACKEND_API}/`, {
      method: "DELETE",
      body: JSON.stringify({ idx: noteId }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setNotes(data.notes))
      .catch(err => console.error(err));
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Handle search clear
  const handleClearSearch = () => {
    setSearch('');
  };

  // Handle category selection
  const handleCategoryClick = (e) => {
    const category = e.target.id;
    if (category) {
      setActiveCategory(category);
    }
  };

  // Handle show completed toggle
  const handleShowCompletedToggle = (e) => {
    setShowOnlyCompleted(e.target.checked);
  };

  // Handle update note
  const handleUpdateNote = (e) => {
    const noteId = e.target.getAttribute("name");
    const updateData = { ...updateValue, id: noteId };

    fetch(`${BACKEND_API}/updateNotes`, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setNotes(data.notes))
      .catch(err => console.error(err));
  };

  // Handle edit input changes
  const handleEditInputChange = (e) => {
    const { id, value } = e.target;
    setUpdateValue({ ...updateValue, [id]: value });
  };

  // Handle cancel edit
  const handleCancelEdit = (e) => {
    const noteId = e.target.getAttribute("name");
    const updatedNotes = notes.map((note) =>
      note._id === noteId ? { ...note, isEdit: false } : note
    );
    setNotes(updatedNotes);
  };

  // Handle logout
  const handleLogout = async () => {
    
    try {
      const res = await fetch(`${BACKEND_API}/logout`, {
        credentials: 'include'
      });
      if (res.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotes = getFilteredNotes();

  return (
    <>
      <div className={`p-10 border-2 bg-yellow-50 min-h-screen ${showForm && "opacity-40"}`}>
        {/* Header Section */}
        <div className="flex justify-around items-center mb-4">
          <div className="relative w-1/2">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                search
              </span>
              <span
                className="material-symbols-outlined cursor-pointer absolute right-4 top-2.5 text-gray-400"
                onClick={handleClearSearch}
              >
                close
              </span>
            </form>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600 transition"
          >
            <span className="material-symbols-outlined">add</span> Add
          </button>
          <button onClick={handleLogout} className="hover:opacity-70 transition">
            <span className="material-symbols-outlined">
              <abbr className="no-underline" title="Logout">logout</abbr>
            </span>
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">Your notes</h2>

        {/* Category Navigation */}
        <div className="flex items-center mb-4">
          <nav className="flex space-x-4" onClick={handleCategoryClick}>
            <p
              id="all"
              className={`text-gray-500 cursor-pointer hover:text-gray-700 ${activeCategory === "all" && "font-bold text-blue-600"}`}
            >
              ALL
            </p>
            <p
              id="personal"
              className={`text-gray-500 cursor-pointer hover:text-gray-700 ${activeCategory === "personal" && "font-bold text-blue-600"}`}
            >
              PERSONAL
            </p>
            <p
              id="home"
              className={`text-gray-500 cursor-pointer hover:text-gray-700 ${activeCategory === "home" && "font-bold text-blue-600"}`}
            >
              HOME
            </p>
            <p
              id="business"
              className={`text-gray-500 cursor-pointer hover:text-gray-700 ${activeCategory === "business" && "font-bold text-blue-600"}`}
            >
              BUSINESS
            </p>
          </nav>
          
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note, index) => (
            <div
              key={note._id || index}
              className={`p-4 rounded-lg shadow-md ${note.isCompleted === "true" ? "bg-green-100" : "bg-white"}`}
            >
              <div className="flex items-center mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    note.category === 'Business'
                      ? 'bg-purple-200 text-purple-700'
                      : note.category === 'Home'
                      ? 'bg-green-200 text-green-700'
                      : 'bg-orange-200 text-orange-700'
                  }`}
                >
                  {note.category}
                </span>
                <div className="ml-auto flex space-x-2 gap-5">
                
                  <span
                    name={note._id}
                    onClick={handleEditNote}
                    className="material-symbols-outlined cursor-pointer hover:text-blue-600"
                  >
                    edit
                  </span>
                  <span
                    name={note._id}
                    onClick={handleDeleteNote}
                    className="material-symbols-outlined cursor-pointer hover:text-red-600"
                  >
                    delete
                  </span>
                </div>
              </div>
              {note.isEdit ? (
                <>
                  <input
                    type="text"
                    id="title"
                    value={updateValue.title}
                    className="w-full outline-none border-b mb-2 p-1"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    id="description"
                    value={updateValue.description}
                    className="w-full outline-none border-b mb-2 p-1"
                    onChange={handleEditInputChange}
                  />
                  <div className="flex justify-end gap-5 mt-4">
                    <span
                      className="material-symbols-outlined cursor-pointer hover:text-red-600"
                      name={note._id}
                      onClick={handleCancelEdit}
                    >
                      close
                    </span>
                    <span
                      className="material-symbols-outlined cursor-pointer hover:text-green-600"
                      name={note._id}
                      onClick={handleUpdateNote}
                    >
                      check
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                  <p className="text-gray-600 mb-2">{note.description}</p>
                </>
              )}
              <p className="text-gray-400 text-sm">{note.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Note Form Modal */}
      <section className={showForm ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>
        <form
          className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg relative"
          onSubmit={handleFormSubmit}
        >
          <span
            className="absolute right-2 top-2 px-2 py-1 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600"
            onClick={() => setShowForm(false)}
          >
            ✕
          </span>
          <h2 className="text-2xl font-bold mb-4">Add Notes</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              value={formData.title}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Note Title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Description"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              onChange={handleInputChange}
              value={formData.category}
            >
              <option value="Home">Home</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full transition"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default App;