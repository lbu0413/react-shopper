import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { stockContext } from "../App.js";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

function Detail(props) {
	let stock = useContext(stockContext);

	let { id } = useParams();
	let foundItem = props.items.find((item) => item.id == id);
	let history = useHistory();

	useEffect(() => {
		let timer = setTimeout(() => {
			setTwoSec(false);
		}, 2000);
		return () => {
			clearTimeout(timer);
		};
	}, []);
	const [twoSec, setTwoSec] = useState(true);
	const [tab, setTab] = useState(0);
	const [animation, setAnimation] = useState(false);

	return (
		<div className="container">
			<div className="row">
				{twoSec ? (
					<div className="my-alert">
						<p>only 2 left in stock!</p>
					</div>
				) : null}

				<div className="col-md-6">
					<img
						src="https://codingapple1.github.io/shop/shoes1.jpg"
						width="100%"
						alt="img1"
					/>
				</div>
				<div className="col-md-6 mt-4">
					<h4 className="pt-5">{foundItem.title}</h4>
					<p>{foundItem.content}</p>
					<p>{foundItem.price}</p>
					<Info stock={props.stock}></Info>
					<button
						className="btn btn-danger"
						onClick={() => {
							let newStock = [...props.stock];
							newStock[0]--;
							if (newStock[0] === 0) {
								return 0;
							}
							props.setStock(newStock);
						}}>
						주문하기
					</button>
					<button
						onClick={() => {
							history.push("/");
						}}
						className="btn btn-danger">
						back
					</button>
				</div>
			</div>

			<Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
				<Nav.Item>
					<Nav.Link
						eventKey="link-0"
						onClick={() => {
							setAnimation(false);
							setTab(0);
						}}>
						Option 2
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="link-1"
						onClick={() => {
							setAnimation(false);
							setTab(1);
						}}>
						Disabled
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<CSSTransition in={animation} classNames="wow" timeout={500}>
				<TabContent tab={tab} setAnimation={setAnimation} />
			</CSSTransition>
		</div>
	);
}

function TabContent({ tab, setAnimation }) {
	useEffect(() => {
		setAnimation(true);
	});
	if (tab === 0) {
		return <div>contents for 0</div>;
	}
	if (tab === 1) {
		return <div>contents for 1</div>;
	}
}

function Info({ stock }) {
	return <p>Stock: {stock[0]}</p>;
}

export default Detail;
