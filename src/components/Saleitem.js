import React, { useState } from "react";

const Saleitem = ({ items, index }) => {
	return (
		<div className="col-md-4">
			<img src={items.img} alt="macbook" width="100%" height="130px" />
			<h4>{items.title}</h4>
			<p>{items.content}</p>
		</div>
	);
};

export default Saleitem;
