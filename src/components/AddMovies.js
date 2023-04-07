import React from 'react'
import {db, auth} from '../config/Firebse'
import { collection, addDoc} from 'firebase/firestore';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const AddMovies = () => {
  const [movieTitle,setMovieTitle]=useState("")
  const [leadRole,setLeadRole]=useState("")
  const [releaseYear,setReleaseYear]=useState(0)
  const navigate=useNavigate();
  const movieCollectionRef=collection(db,"movies");
    // add data
  const addNewMovie=async()=>{
    console.log(movieTitle,leadRole,releaseYear);
    try {
      await addDoc(movieCollectionRef,
        {
          title:movieTitle,
          year:releaseYear,
          leadRole:leadRole,
          userId:auth?.currentUser?.uid
        })
        console.log("Added !!!")
        navigate("/movies")
    } catch (error) {
      console.log(error)
    }
    
  }

    return (
        <div>
            <section class="max-w-4xl p-6 mx-auto bg-blue-500 rounded-md shadow-md  mt-20">
                <h1 class="text-xl font-bold text-white capitalize ">ADD MOVIES</h1>
            
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                        <div>
                            <label class="text-white " for="username">Movie Title</label>
                            <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring" onChange={(e) => setMovieTitle(e.target.value)} />
                        </div>

                        <div>
                            <label class="text-white dark:text-gray-200" for="emailAddress">Lead Role</label>
                            <input id="emailAddress" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md    focus:border-blue-500  focus:outline-none focus:ring" onChange={(e)=>setLeadRole(e.target.value)} />
                        </div>

                        <div>
                            <label class="text-white " for="password">Release Year</label>
                            <input id="password" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md    focus:border-blue-500  focus:outline-none focus:ring" onChange={(e)=>setReleaseYear(e.target.value)} />
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button class="px-6 py-2 leading-5 text-white transition-colors font-bold duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-gray-600" onClick={addNewMovie}>ADD</button>
                    </div>
              
            </section>
        </div>
    )
}

export default AddMovies