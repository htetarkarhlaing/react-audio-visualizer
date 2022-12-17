import { useState, useEffect } from "react";
import AudioVisualizer from "./AudioVisualizer";

interface IAudioAnalyzer {
	audio: MediaStream;
}

const AudioAnalyzer = ({ audio }: IAudioAnalyzer) => {
	const [audioData, setAudioData] = useState(new Uint8Array(0));
	const audioContext = new window.AudioContext();
	const analyzer = audioContext.createAnalyser();
	const dataArray = new Uint8Array(analyzer.frequencyBinCount);
	const [rafId, setRafId] = useState(0);

	useEffect(() => {
		const source = audioContext.createMediaStreamSource(audio);
		source.connect(analyzer);
		setRafId(requestAnimationFrame(tick));

		return () => {
			cancelAnimationFrame(rafId);
			analyzer.disconnect();
			source.disconnect();
		};
	}, [audio]);

	const tick = () => {
		analyzer.getByteTimeDomainData(dataArray);
		setAudioData(dataArray);
		setRafId(requestAnimationFrame(tick));
	};

	return <AudioVisualizer audioData={audioData} />;
};

export default AudioAnalyzer;
