import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { ImageDetailsPage } from './ImageDetailsPage';
import { Footer } from './Footer';

import './App.css';

export function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [isSelected, setIsSelected] = useState(false);

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
	}

	const artList = searchResults.map((piece) => {
		return (
			<>
				<ul>
					<button key={piece.id} onClick={() => handleClick(piece)}>
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
				<ImageDetailsPage />
				<Footer />
			</div>
		);
	}
}
