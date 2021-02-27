function getId() {
	const param = window.location.search;
	const id = param.replace("?OrderId=", "");
	return id;
}
function finalOrder() {
	let mainContent = document.getElementById("final-order");

	let numberOrder = document.createElement("p");
	numberOrder.classList.add("number-order");
	numberOrder.textContent = "N° de votre commande : " + getId();

	mainContent.appendChild(numberOrder);

	localStorage.clear();
}
finalOrder();
