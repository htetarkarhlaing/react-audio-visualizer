import { useState } from "react";
import "./App.css";
import AudioAnalyzer from "./components/AudioAnalyzer";

function App() {
	const [audio, setAudio] = useState<MediaStream | null>(null);

	const toggleMicroPhone = () => {
		if (audio) {
			stopMicroPhone();
		} else {
			getMicroPhone();
		}
	};

	const getMicroPhone = async () => {
		const audio = await window.navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false,
      
		});
		setAudio(audio);
	};

	const stopMicroPhone = () => {
		audio?.getTracks().forEach((track) => {
			track.stop();
		});
		setAudio(null);
	};

	return (
		<div className="App">
			<button onClick={toggleMicroPhone}>{audio ? "Stop" : "Open Mic"}</button>
			{audio ? <AudioAnalyzer audio={audio} /> : ""}
		</div>
	);
}

export default App;
