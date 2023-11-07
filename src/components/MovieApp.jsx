import React , { useEffect, useState } from 'react'
import axios from 'axios'
import MovieStyles from '../CSS/Movieapp.module.css'

function MovieApp() {
  let [users,setusers] = useState("")
  let [display,setDisplay] = useState([])
  let [empField,setEmpField] = useState(false)
  let [pageNumber,setPageNumber] = useState(1)
  let [totalPages,setTotalPages] = useState(1)
  let [isloading,setIsLoading] = useState(false)

  useEffect(()=> {
    getMovies(pageNumber)
  },[pageNumber])

  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${users}&api_key=d20f3d07e092055066c6afc65a641a4a`
  const discover = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d20f3d07e092055066c6afc65a641a4a&page=${pageNumber}`
  const imageURL = "https://image.tmdb.org/t/p/w1280"

  //^ Discover Api
  async function getMovies() {
    const response = await axios.get(discover)
    setDisplay(response.data.results)
    setTotalPages(response.data.total_Pages)
    console.log(response.data.results);
  }

  //^ Input Api
  async function searchInput(){
    if(users.trim() === "") {
      setEmpField("Field is Empty")
    } else {
    const inputResponse = await axios.get(apiSearch)
    setDisplay(inputResponse.data.results)
    console.log(inputResponse);
    setusers("")
    setEmpField("") 
  } }

  //^ Getting Input Value
  const getInputData = ({target:{value}}) => {
    setusers(value)
  }

  //^ Submitting Form
  const onSearch = (e) => {
    e.preventDefault()
    searchInput()
  }

  //^ Default Values
  const defaultValues = {
    // defaultImage: "/public/assests/not available.jpg"
    defaultRating: "N/A",
    defaultImage: "https://st3.depositphotos.com/32990740/35467/v/450/depositphotos_354674378-stock-illustration-isolated-picture-flat-style-icon.jpg"
  }

  const handlePageChange = (newPage) => {
    setPageNumber(newPage)
  }

  return (
    <section>
      <div className={MovieStyles.inputContainer}>
        <form onSubmit={onSearch} name='movieApp'>
          <input type="text" placeholder={empField || "Search Movie"} onChange={getInputData} value={users}/>
        </form>
          <button onClick={searchInput}>Search</button>
      </div>
    <div className={MovieStyles.cardContainer}>
      {display.map(({id,poster_path,title,vote_average,overview}) => {
    
        return <div key={id} className={MovieStyles.cards}>
        <div>
          <img src={poster_path ? imageURL + poster_path : defaultValues.defaultImage} alt={title} />
        </div>
          <div className={MovieStyles.cardContent}>
          <h2>{title}</h2>
          <h4>{vote_average ? (vote_average.toString()).slice(0, 3) : defaultValues.defaultRating}</h4>
          </div>
        </div>
      })}
    </div>
    <div className={MovieStyles.pagination}>
      {pageNumber > 1 && (<button onClick={() => handlePageChange(pageNumber - 1)}>Prev</button>)}
      {pageNumber < totalPages || (<button onClick={() => handlePageChange(pageNumber + 1)}>Next</button>)}
    </div>
    <footer>
      <p>IMDB Movie Rating App</p>
    </footer>
    </section>
  )
}


export default MovieApp