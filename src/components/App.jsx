import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { ImageDetailsPage } from './ImageDetailsPage';
import { Footer } from './Footer';

import './App.css';

export function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [isSelected, setIsSelected] = useState(false);

	const basePiece = {
		artist_title: '',
		date_display: '',
		image_id: '',
		thumbnail: {
			alt_text: '',
			height: 0,
			width: 0,
		},
		title: '',
		_score: 0,
	};

	const [selectedPiece, setSelectedPiece] = useState(basePiece);

	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/api.js

		searchArtworks(query).then((json) => {
			setSearchResults(json.data);
		});
	}

	function handleClick(piece) {
		setIsSelected(true);
		console.log('piece', piece);
		setSelectedPiece((selectedPiece) => ({
			...selectedPiece,
			artist_title: piece.artist_title,
			date_display: piece.date_display,
			image_id: piece.image_id,
			thumbnail: {
				...selectedPiece.thumbnail,
				alt_text: piece.thumbnail.alt_text,
				height: piece.thumbnail.height,
				width: piece.thumbnail.width,
			},
			title: piece.title,
			_score: piece._score,
		}));
		// setSelectedPiece((piece) => ({
		// 	artist_title: piece.artist_title,
		// 	date_display: piece.date_display,
		// 	image_id: piece.image_id,
		// 	thumbnail: {
		// 		alt_text: piece.thumbnail.alt_text,
		// 		height: piece.thumbnail.height,
		// 		width: piece.thumbnail.width
		// 	},
		// 	title: piece.title,
		// 	_score: piece._score
		// }))
		// const clickedPiece = {
		// 	artist_title: piece.artist_title,
		// 	date_display: piece.date_display,
		// 	image_id: piece.image_id,
		// 	thumbnail: {
		// 		alt_text: piece.thumbnail.alt_text,
		// 		height: piece.thumbnail.height,
		// 		width: piece.thumbnail.width
		// 	},
		// 	title: piece.title,
		// 	_score: piece._score
		// }
		// console.log("clickedPiece", clickedPiece)
		// setSelectedPiece((selectedPiece) => ({
		// 	...selectedPiece,
		// 	...clickedPiece
		// }))
		console.log('selected piece', selectedPiece);
	}

	function handleBack() {
		setIsSelected(false);
	}

	const artList = searchResults.map((piece) => {
		return (
			<>
				<ul>
					<button
						key={piece.id}
						style={{ backgroundColor: 'transparent', border: 'none' }}
						onClick={() => handleClick(piece)}
					>
						{piece.title} by {piece.artist_title}
					</button>
				</ul>
			</>
		);
	});

	if (isSelected === false) {
		return (
			<div className="App">
				<h1>TCL Career Lab Art Finder</h1>
				<SearchForm onSearchSubmit={onSearchSubmit} />
				{artList}
				<Footer />
			</div>
		);
	} else {
		return (
			<div className="App">
				<h1>TCL Career Lab Art Finder</h1>
				<SearchForm onSearchSubmit={onSearchSubmit} />
				<ImageDetailsPage handleBack={handleBack} piece={selectedPiece} />
				<Footer />
			</div>
		);
	}
}
