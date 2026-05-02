import type { CSSProperties } from "react";

type Star = {
	id: string;
	left: string;
	top: string;
	size: number;
	opacity: number;
	duration: number;
	delay: number;
	driftX: number;
	driftY: number;
	color: string;
};

function createSeededRandom(seed: number) {
	let value = seed % 2147483647;

	if (value <= 0) {
		value += 2147483646;
	}

	return () => {
		value = (value * 16807) % 2147483647;
		return (value - 1) / 2147483646;
	};
}

function createStars(count: number, seed: number, palette: string[]) {
	const random = createSeededRandom(seed);

	return Array.from({ length: count }, (_, index): Star => ({
		id: `star-${seed}-${index}`,
		left: `${(random() * 100).toFixed(3)}%`,
		top: `${(random() * 100).toFixed(3)}%`,
		size: Number((0.7 + random() * 2.8).toFixed(2)),
		opacity: Number((0.35 + random() * 0.6).toFixed(2)),
		duration: Number((6 + random() * 14).toFixed(2)),
		delay: Number((random() * -18).toFixed(2)),
		driftX: Number((-18 + random() * 36).toFixed(2)),
		driftY: Number((-14 + random() * 28).toFixed(2)),
		color: palette[Math.floor(random() * palette.length)] ?? "255 255 255",
	}));
}

const farStars = createStars(110, 101, ["255 255 255", "191 219 254"]);
const midStars = createStars(70, 202, ["255 255 255", "219 234 254", "147 197 253"]);
const nearStars = createStars(28, 303, ["255 255 255", "255 255 255", "191 219 254"]);

function StarLayer({
	stars,
	className,
}: {
	stars: Star[];
	className: string;
}) {
	return (
		<div className={className} aria-hidden="true">
			{stars.map((star) => {
				const style = {
					left: star.left,
					top: star.top,
					width: `${star.size}px`,
					height: `${star.size}px`,
					"--star-opacity": `${star.opacity}`,
					"--star-color": star.color,
					"--star-duration": `${star.duration}s`,
					"--star-delay": `${star.delay}s`,
					"--star-drift-x": `${star.driftX}px`,
					"--star-drift-y": `${star.driftY}px`,
				} as CSSProperties;

				return <span key={star.id} className="starfield-star" style={style} />;
			})}
		</div>
	);
}

export default function Starfield() {
	return (
		<div className="starfield" aria-hidden="true">
			<StarLayer stars={farStars} className="starfield-layer starfield-layer-far" />
			<StarLayer stars={midStars} className="starfield-layer starfield-layer-mid" />
			<StarLayer stars={nearStars} className="starfield-layer starfield-layer-near" />
		</div>
	);
}
