import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [movieInfo, setMovieInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setMovieInfo([]);
    setSearch(e.target.value);
  };

  const handleCard = (e) => {
    navigate(`/id/${e}`);
  };

  const handleSearch = () => {
    setisLoading(true);
    axios
      .get(`https://www.omdbapi.com/?s=${search}&apikey=e52be867`)
      .then((res) => {
        setMovieInfo(res.data.Search);
        setisLoading(false);
        if(!res.data.Search){
          alert('Movie Not Found');
        }
      })
      .catch((err) => {
        setisLoading(false);
        alert("NOT FOUND");
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}`, {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          setName(res.data.username);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, navigate]);
  return (
    <div className="home">
      <div className="navback"></div>
      <div className="searchDesign">
        <span className="greeting">Welcome! {name}</span>
        <div className="searchBar">
          <input
            type="text"
            name="search"
            placeholder="Search any movie"
            className="searchbar"
            onChange={handleChange}
          />
          <button className="searchbutton" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {movieInfo !== [] && search !== "" ? (
        <>
          {!isLoading ? (
            <div className="contentMain">
              {movieInfo?.map((e, i) => {
                return (
                  <div
                    className="contentCard"
                    onClick={() => handleCard(e.imdbID)}
                  >
                    <span className="movieTitle">{e.Title}</span>
                    <img
                      src={e.Poster ? e.Poster : ""}
                      alt=""
                      className="poster"
                      style={{ height: "20rem" }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          )}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
