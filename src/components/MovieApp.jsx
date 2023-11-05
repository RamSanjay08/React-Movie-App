import React , { useEffect, useState } from 'react'
import axios from 'axios'
import MovieStyles from '../CSS/Movieapp.module.css'

function MovieApp() {
  let [users,setusers] = useState("")
  let [display,setDisplay] = useState([])
  let [empField,setEmpField] = useState(false)

  useEffect(()=> {
    getMovies()
  },[])

  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${users}&api_key=d20f3d07e092055066c6afc65a641a4a`
  const discover = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d20f3d07e092055066c6afc65a641a4a&page=2`
  const imageURL = "https://image.tmdb.org/t/p/w1280"

  //^ Discover Api
  async function getMovies() {
    const response = await axios.get(discover)
    setDisplay(response.data.results)
    console.log(response.data.results);
  }

  //^ Input Api
  async function searchInput(){
    if(users.trim() === "") {
      setEmpField("Field is Empty")
    } else{
    const inputResponse = await axios.get(apiSearch)
    setDisplay(inputResponse.data.results)
    console.log(inputResponse);
    setusers("")
    setEmpField("") 
  }
  }

  const getInputData = ({target:{value}}) => {
    setusers(value)
  }

  const onSearch = (e) => {
    e.preventDefault()
    searchInput()
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
      {display.map(({id,poster_path,title,vote_average,overview,original_title}) => {
        return <div key={id} className={MovieStyles.cards}>
          <img src={imageURL + poster_path} alt={title} />
          <div className={MovieStyles.cardContent}>
          <h2>{title}</h2>
          <h4>{vote_average}</h4>
          </div>
        </div>
      })}
    </div>
    <footer>
      <p>IMDB Movie Rating App</p>
    </footer>
    </section>
  )
}

export default MovieApp