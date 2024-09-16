import React, { useState } from 'react'

function App() {
 const [showForm ,setShowForm ]=  useState(false)
 const [formData , setFormData] = useState({category : "home" , title : "", description : ''})
 const [notes ,setNotes] = useState([])

 useState(()=>{
   fetch("http://localhost:4000")
   .then(res => res.json())
   .then(data => setNotes(data))
   .catch(err => console.error(err))
 },[])
 
 function inputHandle(e){
   const{value, id} =  e.target
   setFormData({...formData , [id] : value})
 }

 function formHandle(e){
    e.preventDefault()
    fetch("http://localhost:4000/",{
      method :  "POST" ,
      body : JSON.stringify(formData),
      headers : {
        "content-Type" : "application/json"
      }
    })
    .then(res => res.json())
    .then(data => setNotes(data))
    .catch(err => console.error(err))
    setShowForm(false);
    setFormData({category : "home" , title : ""  , description : ''})
 }
 function handleNotes(e) {
  const name =  e.target.getAttribute("name")
  const word =   name.split("")
  let select = word[word.length-1]
  
    if (select == 'e') {
      console.log('edit')
    }
    if (select == 'd') {
      console.log('delete')
    }
 }

  return (
    <>
    <div className= {`p-10 border-2  bg-yellow-50 h-screen ${showForm && "opacity-40"}`}>
      <div className="flex justify-around items-center mb-4 ">
        <div className="relative w-1/2">
          <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
        </div>
        <button onClick={()=>{setShowForm(!showForm)}} className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
          <span className="material-symbols-outlined">add</span> Add
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Your notes</h2>
      <div className="flex items-center mb-4">
        <nav className="flex space-x-4">
          <a href="#" className="text-blue-500 border-b-2 border-blue-500 pb-1">ALL</a>
          <a href="#" className="text-gray-500">PERSONAL</a>
          <a href="#" className="text-gray-500">HOME</a>
          <a href="#" className="text-gray-500">BUSINESS</a>
        </nav>
        <div className="ml-auto flex items-center">
          <input type="checkbox" id="completed" className="mr-2" />
          <label htmlFor="completed" className="text-gray-500">Show only completed notes</label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <span className={`px-2 py-1 rounded-full text-l font-semibold ${note.category === 'Business' ? 'bg-purple-200 text-purple-700' : note.category === 'Home' ? 'bg-green-200 text-green-700' : 'bg-orange-200 text-orange-700'}`}>
                {note.category}
              </span>
              <div className="ml-auto flex space-x-2 gap-5">
                <input type="checkbox" name="" id="" />
                <span name={index+"e"} onClick={handleNotes} className="material-symbols-outlined cursor-pointer">edit</span>
                <span name={index+"d"} onClick={handleNotes} className="material-symbols-outlined cursor-pointer">delete</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-2">{note.description}</p>
            <p className="text-gray-400 text-sm">{note.date}</p>
          </div>
        ))}
      </div>
    </div>
    <section className={showForm ? "show" : "hide"}>  
    <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded" onSubmit={formHandle}>
      <button className="absolute right-5 px-3 bg-orange-500 text-white"onClick={()=>{setShowForm(false)}}><span className="material-symbols-outlined">x</span></button>
        <h2 className="text-2xl font-bold mb-4">Add Notes</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input value={formData.title} onChange={inputHandle} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Note Title"/>
        </div> 
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={inputHandle} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description"/>
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
