import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';

import './App.css';

export function App() {
	const [searchResults, setSearchResults] = useState([]);

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

		// return resultArray;

		// const searchResults = searchArtworks(query).then((json) => {
		// 	if (json.data) {
		// 		json().then((json) => {
		// 			json.data.map((piece) => {
		// 				return (
		// 					<ul>
		// 						<li>{piece.title} by {piece.artist_title}</li>
		// 					</ul>
		// 				)
		// 			})
		// 		})
		// 	}
		// 	console.log("search results", searchResults)
		// })

		// const searchResults = searchArtworks(query).then((json) => {
		// 	console.log(json.data);

		// 	json.data?.map((piece) => {
		// 		return (
		// 			<ul>
		// 				<li>{piece.title} by {piece.artist_title}</li>
		// 			</ul>
		// 		)
		// 	})
		// });
		// console.log("search results", searchResults)
		// return searchResults
	}

	const artList = searchResults.map((piece) => {
		return (
			<ul>
				<li>
					{piece.title} by {piece.artist_title}
				</li>
			</ul>
		);
	});

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			<SearchForm onSearchSubmit={onSearchSubmit} />
			{artList}
			<Footer />
		</div>
	);
}
