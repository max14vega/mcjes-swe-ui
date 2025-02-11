import axios from "axios";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BACKEND_URL } from "../../constants";
import ErrorMessage from "./ErrorMessage";
import PeopleForm from "./Form/PeopleForm";

const PEOPLE_ENDPOINT = `${BACKEND_URL}/people`;

function Game({ game }) {
	const { name, numPlayers } = game;
	return (
		<Link to={name}>
			<div className="game-container">
				<h2>{name}</h2>
				<p>Players: {numPlayers}</p>
			</div>
		</Link>
	);
}
Game.propTypes = {
	game: propTypes.shape({
		name: propTypes.string.isRequired,
		numPlayers: propTypes.number.isRequired,
	}).isRequired,
};

function gamesObjectToArray({ Data }) {
	const keys = Object.keys(Data);
	const games = keys.map((key) => Data[key]);
	return games;
}

function Games() {
	const [error, setError] = useState("");
	const [games, setGames] = useState([]);
	const [addingGame, setAddingGame] = useState(false);

	const fetchPeople = () => {
		axios
			.get(PEOPLE_ENDPOINT)
			.then(({ data }) => setGames(gamesObjectToArray(data)))
			.catch(() =>
				setError("There was a problem retrieving the list of games."),
			);
	};

	const showAddGameForm = () => {
		setAddingGame(true);
	};
	const hideAddGameForm = () => {
		setAddingGame(false);
	};

	useEffect(fetchPeople, []);

	return (
		<div className="wrapper">
			<header>
				<h1>View All People</h1>
				<button type="button" onClick={showAddGameForm}>
					Add a Person
				</button>
			</header>
			<PeopleForm
				visible={addingGame}
				cancel={hideAddGameForm}
				fetchGames={fetchPeople}
				setError={setError}
			/>
			{error && <ErrorMessage message={error} />}
			{games.map((game) => (
				<Game key={game.name} game={game} />
			))}
		</div>
	);
}

export default Games;
