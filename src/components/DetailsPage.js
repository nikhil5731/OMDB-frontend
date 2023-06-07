import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const [moviesInfo, setMoviesInfo] = useState([]);
  const ratingsUrl = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Rotten_Tomatoes_alternative_logo.svg/2062px-Rotten_Tomatoes_alternative_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png",
  ];
  const params = useParams();

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`https://www.omdbapi.com/?i=${params.imdbId}&apikey=e52be867`)
      .then((res) => {
        setMoviesInfo(res.data);
        setisLoading(false);
        if (!res.data) {
          alert("Movie Not Found!!!");
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  }, []);
  return (
    <div style={{ color: "white" }}>
      <div className="navback"></div>
      {!isLoading ? (
        <div className="infobox">
          <div className="infoBody">
            <img src={moviesInfo.Poster} alt="" />
            <div className="info">
              <h1>
                {moviesInfo.Title} , {moviesInfo.Year}
              </h1>
              <span style={{ fontStyle: "italic", margin: "0.5rem" }}>
                Directed by: {moviesInfo.Director}
              </span>
              <h3>
                {moviesInfo.Released} , {moviesInfo.Runtime}
              </h3>
              <h3>{moviesInfo.Genre}</h3>
              <h3>
                Country - {moviesInfo.Country}, Language - {moviesInfo.Language}
              </h3>
              <h4>Writers: {moviesInfo.Writer}</h4>
              <span className="plot">Movie Plot</span>
              <span className="description">{moviesInfo.Plot}</span>
              <h3 className="awards">{moviesInfo.Awards}</h3>
              <img src="" alt="" height={"50rem"} />
              <div className="Ratings">
                {moviesInfo.Ratings?.map((e, i) => {
                  return (
                    <>
                      <div className="rating" key={i}>
                        <img src={ratingsUrl[i]} alt="" height={"50rem"} />
                        <span style={{ marginLeft: "1rem" }}>{e.Value} </span>
                      </div>
                    </>
                  );
                })}
              </div>
              <h4 className="BoxOffice">
                BoxOffice Collection: {moviesInfo.BoxOffice}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-container detailloader">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
