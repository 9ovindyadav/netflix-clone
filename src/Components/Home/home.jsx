import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import {ImPlay3,ImPlus} from "react-icons/im";

const imgurl = "https://image.tmdb.org/t/p/w500";

const upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=1da32d8ecc2c2173c916613e4840b522";
const nowPlaying = "https://api.themoviedb.org/3/tv/popular?api_key=1da32d8ecc2c2173c916613e4840b522&language=en-US&page=1";
const latest = "https://api.themoviedb.org/3/movie/now_playing?api_key=1da32d8ecc2c2173c916613e4840b522&language=en-US&page=1";
const popular = "https://api.themoviedb.org/3/movie/popular?api_key=1da32d8ecc2c2173c916613e4840b522&language=en-US&page=1";



function Cover({img}){
    return(
      <img className="card" src={img} alt="cover" />
    );
} // For Card in the Row




function Row({title,cardArr = [{}]}){
    return(
        <div className="row">
            <h1>{title}</h1>
            <div>
                {
                    cardArr.map((item,index)=>{
                      return  <Cover key={index} img={`${imgurl}${item.poster_path}`}/>
                    })
                    
                }
        </div>
        </div>
    );
}




function Home(){

    const [upcomingMovies,setupcomingMovies] = useState();
    const [nowplayingMovies,setnowplayingMovies] = useState();
    const [latestMovies,setlatestMovies] = useState();
    const [popularMovies,setpopularMovies] = useState();

    useEffect(()=>{
          
        const fetchUpcoming = async ()=>{
            const {data} = await axios.get(`${upcoming}`);
              
              setupcomingMovies(data.results)
        }

        const fetchnowPlaying = async ()=>{
            const {data} = await axios.get(`${nowPlaying}`);
              
            setnowplayingMovies(data.results)
        }

        const fetchPopular = async ()=>{
            const {data} = await axios.get(`${popular}`);
              
            setpopularMovies(data.results)
        }

        const fetchLatest = async ()=>{
            const {data} = await axios.get(`${latest}`);
              
            setlatestMovies(data.results)
        }

   
        fetchUpcoming();
        fetchnowPlaying();
        fetchPopular();
        fetchLatest();
        
        },[]);

        const a = Math.floor(Math.random()*10);
        console.log(a);

        const bannerImg = popularMovies && popularMovies[a] && popularMovies[a].poster_path;
        const bannertitle = popularMovies && popularMovies[a] && popularMovies[a].original_title;
        const bannerOverview = popularMovies && popularMovies[a] && popularMovies[a].overview;
       
        console.log(bannerOverview);

    return(
    <section className="home">
        <div className="banner" style={{
        backgroundImage: bannerImg ? `url(${imgurl}${bannerImg})` : "rgb(21, 19, 19)"
    }}> 
        <h1>{bannertitle}</h1>
        <p>{bannerOverview}</p>

        <button>Play <ImPlay3/></button>
        <button>MyList <ImPlus/></button>
        </div>
        <Row title={"Now Playing"} cardArr={nowplayingMovies}/>
        <Row title={"Popular"} cardArr={popularMovies}/>
        <Row title={"Latest"} cardArr={latestMovies}/>
        <Row title={"UpComing Movies"} cardArr={upcomingMovies}/>
    
    </section>
    
 );
}

export default Home;