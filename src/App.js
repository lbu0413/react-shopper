import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Jumbotron, Button } from "react-bootstrap";
import "./App.css";
import itemsData from "./data";
import Saleitem from "./components/Saleitem";
import Detail from "./components/Detail";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cart from "./components/Cart.js";
export let stockContext = React.createContext();

function App() {
	const [items, setItems] = useState(itemsData);
	const [stock, setStock] = useState([10, 11, 12]);

	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="/">Wook's Shop</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link as={Link} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/detail">
							Detail
						</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Switch>
				<Route exact path="/">
					<Jumbotron className="background">
						<h1>20% Season OFF</h1>
						<p>
							<Button variant="primary">Learn more</Button>
						</p>
					</Jumbotron>

					<div className="container">
						<div className="row">
							{items.map((item, index) => {
								return <Saleitem items={item} index={index} key={index} />;
							})}
						</div>

						<button
							className="btn btn-secondary"
							onClick={() => {
								axios
									.get("https://codingapple1.github.io/shop/data2.json")
									.then((res) => {
										setItems([...items, ...res.data]);
									})
									.catch((err) => console.log(err));
							}}>
							more items
						</button>
					</div>
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<stockContext.Provider value={stock}>
					<Route path="/detail/:id">
						<Detail items={items} stock={stock} setStock={setStock} />
					</Route>
					<Route path="/:id"></Route>
				</stockContext.Provider>
			</Switch>
		</div>
	);
}

export default App;
