import React from 'react';

export default function ExpandableImage({
	src,
	onClick,
}: {
	src: string;
	onClick: () => void;
}) {
	return <img src={src} className="img-in-grid" onClick={onClick}></img>;
}
