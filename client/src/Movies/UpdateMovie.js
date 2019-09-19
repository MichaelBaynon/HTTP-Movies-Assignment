import React, { useState, useEffect } from "react";
import axios from "axios";



const UpdateMovie = props => {
  const [movie, setMovie] = useState(null);
  const handleChange = e =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleStar = index => e => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) => {
        if (starIndex === index) {
          return e.target.value;
        } else {
          return star;
        }
      })
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  

  if (!movie) {
    return <div>Loading movies :)</div>;
  }

  return (
    <form className='updateMovieForm' onSubmit={handleSubmit}>

      <h3>Title: </h3>

      <input
        type="text"
        name="title"
        placeholder="title"
        value={movie.title}
        onChange={handleChange}
      />

      <h3>Director: </h3>

      <input
        type="text"
        name="director"
        placeholder="director"
        value={movie.director}
        onChange={handleChange}
      />

      <h3>Metascore: </h3>

      <input
        type="text"
        name="metascore"
        placeholder="metascore"
        value={movie.metascore}
        onChange={handleChange}
      />

      <h3>Actors: </h3>

      {movie.stars.map((starName, index) => {
        return (
          <input
            type="text"
            placeholder="star"
            value={starName}
            key={index}
            onChange={handleStar(index)}
          />
        );
      })}
      <button type='submit'>Update Movie</button>
      
    </form>
  );
};

export default UpdateMovie;
