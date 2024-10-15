import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [addClass, setAddClass] = useState("all")
  const [updateValue, setUpDateValue] = useState({ title: "", description: '' })
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState({ category: "Home", title: "", description: '', isCompleted: false })
  const [notes, setNotes] = useState([])
  const [cancel, setCancel] = useState(true)
  const [allChecked, setAllChecked] = useState(false);
  const navigate = useNavigate()
  let showNotes = []
  // const [showNotes , setShowNotes] = useState(notes)

  if (addClass == 'all' && !allChecked || search != '') {
    showNotes = notes;
  } else if (allChecked) {
    showNotes = notes.filter(note => note.isCompleted == "true");
  } else {
    showNotes = notes.filter(note => note.category.toLowerCase() == addClass.toLowerCase())
  }

  useEffect(() => {
    fetch('http://localhost:4000/check', {
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          navigate('/login')
        }
      })
      .catch((err) => {
        navigate('/login')
        console.log(err)
      })
  }, [])

  useEffect(() => {
      fetch("http://localhost:4000", {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          setNotes(data[0].notes)
        })
        .catch(err => console.error(err))
  } , [cancel])

  async function completedHandle(e) {
    const check = e.target.checked
    const _id = e.target.id
    const myID = localStorage.getItem('myID')
    try {
      const res = await fetch("http://localhost:4000/checked/" + myID, {
        method: "POST",
        body: JSON.stringify({ _id, check }),
        headers: {
          "content-Type": "application/json"
        },
      })
      const data = await res.json()
      setNotes(data.notes)
    } catch (err) {
      console.log(err)
    }
  }

  function inputHandle(e) {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }
  function formHandle(e) {
    e.preventDefault()
    fetch("http://localhost:4000/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setNotes(data.notes))
      .catch(err => console.error(err))
    setShowForm(false);
    setFormData({ category: "Home", title: "", description: '' })
  }
  function editNotes(e) {
    const idx = e.target.getAttribute("name")
    const updateData = notes.map((val) => val._id == idx ? { ...val, isEdit: true } : val)
    let obj = {}
    updateData.forEach((val) => {
      if (val._id == idx) {
        obj = { title: val.title, description: val.description }
        return;
      }
    })
    setUpDateValue(obj)
    setNotes(updateData)
  }
  function deleteNotes(e) {
    const idx = e.target.getAttribute("name")
    fetch("http://localhost:4000", {
      method: "DELETE",
      body: JSON.stringify({ idx }),
      headers: {
        "content-Type": "application/json"
      },
      credentials: 'include'

    })
      .then(res => res.json())
      .then(data => setNotes(data.notes))
      .catch(err => console.log(err))
  }
  function searchHandle(e) {
    e.preventDefault();
    const filterData = notes.filter((note) => note.title.includes(search) || note.description.includes(search))
    setNotes(filterData)
  }
  function noteCategory(e) {
    const ctg = e.target.id
    if (ctg == '') {
      return
    }
    setAddClass(ctg)
  }

  function completedNotesHandle(e) {
    const check = e.target.checked;
    setAllChecked(check)
  }
  function updateNotes(e) {
    const _id = e.target.getAttribute("name")
    updateValue.id = _id;
    fetch("http://localhost:4000/updateNotes", {
      method: "PUT",
      body: JSON.stringify(updateValue),
      headers: {
        "content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(res => {
        return res.json()
      })
      .then(data => setNotes(data.notes))
      .catch(err => console.log(err))
  }
  function handleEdit(e) {
    const { id, value } = e.target;
    setUpDateValue({ ...updateValue, [id]: value })
  }
  function updateCancel(e) {
    const idx = e.target.getAttribute("name")
    const updateData = notes.map((val) => val._id == idx ? { ...val, isEdit: false } : val)
    setNotes(updateData)
  }
  const logout = async () => {
    try {
      const res = await fetch('http://localhost:4000/logout', {
        credentials: 'include'
      })
      const data = await res.json()
      if (res.ok) {
        console.log('hello')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className={`p-10 border-2  bg-yellow-50 h-screen ${showForm && "opacity-40"}`}>
        <div className="flex justify-around items-center mb-4 ">
          <div className="relative w-1/2">
            <form action="" onSubmit={searchHandle}>
              <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
              <span className="material-symbols-outlined cursor-pointer absolute right-4 top-2.5 text-gray-400" onClick={() => {setCancel(!cancel), setSearch('')}}>close</span>
            </form>
          </div>
          <button onClick={() => { setShowForm(!showForm) }} className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
            <span className="material-symbols-outlined">add</span> Add
          </button>
          <button onClick={logout}><span className="material-symbols-outlined"><abbr className='no-underline' title="Logout"> logout</abbr></span></button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Your notes</h2>
        <div className="flex items-center mb-4">
          <nav className="flex space-x-4" onClick={noteCategory}>
            <p id='all' className={`text-gray-500 cursor-pointer ${addClass == "all" && "active"}`}>ALL</p>
            <p id='personal' className={`text-gray-500 cursor-pointer ${addClass == "personal" && "active"}`}>PERSONAL</p>
            <p id='home' className={`text-gray-500 cursor-pointer ${addClass == "home" && "active"}`}>HOME</p>
            <p id='business' className={`text-gray-500 cursor-pointer ${addClass == "business" && "active"}`}>BUSINESS</p>
          </nav>
          <div className="ml-auto flex items-center">
            <input type="checkbox" id="completed" className="mr-2" onChange={completedNotesHandle} />
            <label htmlFor="completed" className="text-gray-500">Show only completed notes</label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {showNotes.map((note, index) => (
            <div key={index} className={`p-4 rounded-lg shadow-md ${note.isCompleted == "true" ? "bg-green-100" : "bg-white"}`}>
              <div className="flex items-center mb-2">
                <span className={`px-2 py-1 rounded-full text-l font-semibold ${note.category === 'Business' ? 'bg-purple-200 text-purple-700' : note.category === 'Home' ? 'bg-green-200 text-green-700' : 'bg-orange-200 text-orange-700'}`}>
                  {note.category}
                </span>
                <div className="ml-auto flex space-x-2 gap-5">
                  <input type="checkbox" name="" id={note._id} onChange={completedHandle} checked={note.isCompleted == 'true' ? true : false} />
                  <span name={note._id} onClick={editNotes} className="material-symbols-outlined cursor-pointer">edit</span>
                  <span name={note._id} onClick={deleteNotes} className="material-symbols-outlined cursor-pointer">delete</span>
                </div>
              </div>
              {
                note.isEdit ? <>
                  <input type="text" id='title' value={updateValue.title} className='w-full outline-none' onChange={handleEdit} />
                  <input type="text" id='description' value={updateValue.description} className='w-full outline-none' onChange={handleEdit} />
                  <div className='flex justify-end gap-5 mt-4'>
                    <span className="material-symbols-outlined cursor-pointer" name={note._id} onClick={updateCancel}>close</span>
                    <span className="material-symbols-outlined cursor-pointer" name={note._id} onClick={updateNotes}>check</span>
                  </div>
                </> : <>
                  <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                  <p className="text-gray-600 mb-2">{note.description}</p>
                </>
              }
              <p className="text-gray-400 text-sm">{note.date}</p>
            </div>
          ))}
        </div>
      </div>
      <section className={showForm ? "show" : "hide"}>
        <form className="max-w-md mx-auto p-4 bg-white shadow-md " onSubmit={formHandle}>
          <span className="absolute right-5 px-3 bg-orange-500 text-white" onClick={() => { setShowForm(false) }}><span className="material-symbols-outlined cursor-pointer">x</span></span>
          <h2 className="text-2xl font-bold mb-4">Add Notes</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
            <input value={formData.title} onChange={inputHandle} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Note Title" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea value={formData.description} onChange={inputHandle} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" id="category" onChange={inputHandle}>
              <option value="Home">Home</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default App
