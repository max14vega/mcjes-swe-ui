import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const PAGES = [
	{ label: "Home", destination: "/" },
	{ label: "View All Games", destination: "/games" },
	{ label: "View All Users", destination: "/users" },
];

function NavLink({ page }) {
	const { label, destination } = page;
	return (
		<Button 
      variant="contained" 
      component={Link} 
      to={destination}
      sx={{ display: 'inline-flex', alignItems: 'center' }}>
			{label}
		</Button>
	);
}
NavLink.propTypes = {
	page: propTypes.shape({
		label: propTypes.string.isRequired,
		destination: propTypes.string.isRequired,
	}).isRequired,
};

function Navbar() {
	return (
		<AppBar position="static">
			<Toolbar>
				<div className="wrapper">
					{PAGES.map((page) => (
						<NavLink key={page.destination} page={page} />
					))}
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
