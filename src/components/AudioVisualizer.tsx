import { useEffect, useRef } from "react";

interface IAudioVisualizer {
	audioData: Uint8Array;
}

const AudioVisualizer = ({ audioData }: IAudioVisualizer) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		draw(audioData);
	});

	const draw = (audioDataProps: Uint8Array) => {
		const canvas = canvasRef?.current;
		const height = canvas?.height || 0;
		const width = canvas?.width || 0;
		const context = canvas?.getContext("2d");
		let x = 0;
		const sliceWidth = (width || 0 * 1.0) / audioDataProps.length;

		if (context) {
			context.lineWidth = 2;
			context.strokeStyle = "#D40004";
			context.clearRect(0, 0, width, height);
			context.beginPath();
			context.moveTo(0, height / 2);
			for (const item of audioDataProps) {
				const y = (item / 255.0) * height;
				context.lineTo(x, y);
				x += sliceWidth;
			}
			context.lineTo(x, height / 2);
			context.stroke();
		}
	};

	return <canvas ref={canvasRef} width="800" height="600"></canvas>;
};

export default AudioVisualizer;
