import React, { Component } from "react";
import Particles from "react-particles-js";

import Navigation from "./Components/Navigation/Navigation";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import "./App.css";
const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "e689722f768347a8a3247e6624424580",
});
const particlesOptions = {
	particles: {
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800,
			},
		},
		interactivity: {
			onhover: {
				enable: true,
				mode: "grab",
			},
			modes: {
				grab: {
					distance: 171,
				},
			},
			detect_on: "canvas",
		},
	},
};
class App extends Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imageUrl: "",
		};
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
			function (response) {
				console.log(response.outputs[0]);
			},
			function (err) {}
		);
	};
	render() {
		return (
			<div className='App'>
				<Particles className='particles' params={particlesOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm
					onInputChange={this.onInputChange}
					onButtonSubmit={this.onButtonSubmit}
				/>
				<FaceRecognition imageUrl={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
