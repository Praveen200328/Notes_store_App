import React, { useEffect, useState } from 'react'


import HomePage from './pages/HomePage'
import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Mainlayout from './layouts/mainlayout'
import AddNotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage'
import EditNotePage from './pages/EditNotePage'
import axios from 'axios'
import { toast } from 'react-toastify';
const App = () => {
  const [notes,setNotes]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [searchText ,setSearchText]=useState("")
  const [filterText,setFilterText]=useState("")

  const handleFilterText=(val)=>{
    setFilterText(val)
  }

  const handleSearchText=(val)=>{
    setSearchText(val);
  }


  const filterNotes=filterText==="BUSINESS" ? notes.filter((note)=> note.category=="BUSINESS") 
  : filterText==="PERSONAL" ? notes.filter((note)=> note.category=="PERSONAL") 
  :filterText==="IMPORTANT" ? notes.filter((note)=> note.category=="IMPORTANT") :notes;

  useEffect(()=>{
    setIsLoading(true)
     axios.get("http://127.0.0.1:8000/notes/")
     .then(res=>{
      console.log(res.data)
      setNotes(res.data)
      setIsLoading(false)


     })
     .catch(err=>{
      console.log(err.message)
     })
  },[])


  useEffect(()=>{
    if (searchText.length<3) return ;
    axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
    
    .then(res=>{
      console.log(res.data)
      setNotes(res.data)
      
    })
    .catch(err=>{
      console.log(err.message)
    })
  },[searchText])
  const addNote=(data)=>{
    axios.post('http://127.0.0.1:8000/notes/',data)
    .then(res=>{
      setNotes([...notes,data])
      toast.success("A new Note has been added")
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err.message)

    })
  }

  const updatedNote=(data,slug)=>{
    axios.put(`http://127.0.0.1:8000/notes/${slug}/`,data)
    .then(res=>{
      console.log(res.data)
      
      toast.success("Note Updated succesfully")

    })
    .catch(err=>{
      console.log(err.message)
    })
  }
  const deleteNote=(slug)=>{
    axios.delete(`http://127.0.0.1:8000/notes/${slug}/`)
   
    .catch((err)=>{
      console.log(err.message)
    })
  }

  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Mainlayout searchText={searchText} handleSearchText={handleSearchText}/>}>
      <Route index element={<HomePage notes={filterNotes} loading={isLoading} handleFilterText={handleFilterText} />}/>
      <Route path='/add-note' element={<AddNotePage addNote={addNote}/>}/>
      <Route path='/edit-note/:slug' element={<EditNotePage updatedNote={updatedNote}/>}/>
      <Route path='/notes/:slug' element={<NoteDetailPage deleteNote={deleteNote}/>}/>
    </Route>
    
  ))
  return <RouterProvider router={router}/>


}

export default App
