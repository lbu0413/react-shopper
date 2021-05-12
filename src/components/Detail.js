import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";

function Detail(props) {
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
		</div>
	);
}

function Info({ stock }) {
	return <p>Stock: {stock[0]}</p>;
}

export default Detail;
