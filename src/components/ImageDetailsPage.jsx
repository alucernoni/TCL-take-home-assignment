export function ImageDetailsPage({ piece, handleBack }) {
	return (
		<div>
			<br></br>
			<button onClick={() => handleBack()}>Back</button>
			<br></br>
			<br></br>
			<img alt={piece.thumbnail.alt_text} src={piece.image_id} />
			<p>Title: {piece.title}</p>
			<p>Artist: {piece.artist_title}</p>
		</div>
	);
}
