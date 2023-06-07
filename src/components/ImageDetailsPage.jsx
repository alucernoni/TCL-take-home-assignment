export function ImageDetailsPage({ piece, handleBack }) {
	return (
		<div>
			<button onClick={() => handleBack()}>Back</button>
			<p>image details</p>
			<p>Title: {piece.title}</p>
			<p>Artist: {piece.artist_title}</p>
			<img alt={piece.thumbnail.alt_text} src={piece.image_id} />
		</div>
	);
}
