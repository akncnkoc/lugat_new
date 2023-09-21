import {Link} from "react-router-dom";
import React from "react";

const Header: React.FC = () => {
	return (
		<header>
			<nav>
				<Link
					to=""
					className="mr-4 text-lg font-medium"
				>
					Home
				</Link>
				<Link
					to="/login"
					className="mr-4 text-lg font-medium"
				>
					Login
				</Link>
			</nav>
		</header>
	);
}
export default Header;