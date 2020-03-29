import React from 'react';
import { BookIcon, MusicIcon, GameIcon, MovieIcon } from './ImgIcon.jsx';
import "./styles/Home.scss";

const Home = ({catagories}) =>{
    return (
        <div className="home">
        <div className="home__card-group">
        {catagories.map((cat) => {
            return (
                <div key={cat.type} id="cat.type" className="home__card">
                    <div className="home__card-head">
                        {cat.type === 'book' ? (
                            <BookIcon size={150} className="home__card-img" />
                        ) : cat.type === 'music' ? (
                            <MusicIcon size={150} className="home__card-img" />
                        ) : cat.type === 'game' ? (
                            <GameIcon size={150} className="home__card-img" />
                        ) : (
                            <MovieIcon size={150} className="home__card-img" />
                        )}
                    </div>
                    <div className="home__card-title">{cat.type}</div>
                </div>
            );
        })}
    </div>
    <button>Start</button>
    </div>
    )
}

export default Home;