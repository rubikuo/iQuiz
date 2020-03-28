import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BookIcon, MusicIcon, GameIcon, MovieIcon } from './ImgIcon.jsx';
import './styles/Main.scss';

const Main = () => {
	const [ catagories, setCatagory ] = useState([
		{ type: 'book', id: 1 },
		{ type: 'music', id: 2 },
		{ type: 'game', id: 3 },
		{ type: 'movie', id: 4 }
	]);
	return (
		<div className="main">
			<Helmet>
				<title>Play Ground</title>
			</Helmet>

			<div className="main__card-group">
				{catagories.map((cat) => {
					return (
						<div key={cat.type} id="cat.type" className="main__card">
							<div className="main__card-head">
								{cat.type === 'book' ? (
									<BookIcon size={150} className="main__card-img" />
								) : cat.type === 'music' ? (
									<MusicIcon size={150} className="main__card-img" />
								) : cat.type === 'game' ? (
									<GameIcon size={150} className="main__card-img" />
								) : (
									<MovieIcon size={150} className="main__card-img" />
								)}
							</div>
							<div className="main__card-title">{cat.type}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Main;
