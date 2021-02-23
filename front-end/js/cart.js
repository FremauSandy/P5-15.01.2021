/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
const listPurchase = JSON.parse(localStorage.getItem("listPurchase"));

if (localStorage.getItem("listPurchase") === null) {
	// si le localStorage possede au moins un element
	alert("Votre panier est vide!");
}

if (listPurchase) {
	listPurchase.forEach(item => {
		appearCart(item);
	});
}

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/
function appearCart(item) {
	let itemContent = document.createElement("div");
	itemContent.classList.add("item-content");

	let imgProduct = document.createElement("img");
	imgProduct.src = item.image;
	imgProduct.classList.add("select-img");

	let contentProduct = document.createElement("div");
	contentProduct.classList.add("product-infos");

	let content = document.createElement("span");

	let nameProduct = document.createElement("h3");
	nameProduct.textContent = item.name;
	nameProduct.classList.add("select-name");

	let priceProduct = document.createElement("p");
	priceProduct.textContent = "x" + " " + item.price / 100 + "€";
	priceProduct.classList.add("select-price");

	let contentChoice = document.createElement("span");
	contentChoice.classList.add("select-lens-quantity");

	let totalProduct = document.createElement("p");
	totalProduct.textContent = "=" + "..." + "€";

	/*ACTION SUPPRESSION UNITE*/
	let btnRemove = document.createElement("button");
	btnRemove.classList.add("remove");
	btnRemove.textContent = "Supprimer";
	btnRemove.onclick = function (e) {
		let buttonClicked = e.target;
		buttonClicked.parentElement.parentElement.parentElement.remove();
		removeItemFromCart(item.id);
		saveCart();
	};

	/*QUANTITE DU PRODUIT*/
	const quantity = document.createElement("select");
	quantity.id = "select-quantity" + item.id;

	for (let i = 1; i < 10; i++) {
		// afficher une liste proposant une quantité pour un produit
		const nbrItems = document.createElement("option");
		if (i == item.quantity) {
			nbrItems.setAttribute("selected", "selected");
		}
		nbrItems.textContent = i;
		quantity.appendChild(nbrItems);
	}
	quantity.addEventListener("change", e => {
		const quantityChoice = document.getElementById("select-quantity" + item.id).value;
		item.quantity = quantityChoice;
		saveCart();
		// refrech totalproduct ??
		totalCart();
	});

	itemContent.appendChild(imgProduct); //<img>
	itemContent.appendChild(contentProduct); //<div>
	contentProduct.appendChild(content); //<span>
	content.appendChild(nameProduct); //<h3>
	content.appendChild(btnRemove); //<button>
	contentProduct.appendChild(contentChoice); //<span>
	contentChoice.appendChild(quantity); //<input>
	contentChoice.appendChild(priceProduct); //<p>
	contentChoice.appendChild(totalProduct); //<p>

	document.getElementById("cart-items").appendChild(itemContent);
}

/*ACTION SUPPRESSION FULLCART*/
let fullDeleteButton = document
	.getElementById("full-delete")
	.addEventListener("click", function () {
		if (confirm("Etes-vous sûr de vouloir vider votre panier?")) {
			localStorage.clear();
			location.reload();
			totalCart();
		} else {
			alert("Votre panier est déjà vide!");
		}
	});

/*SUPPRIMER UN PRODUIT*/
function removeItemFromCart(id) {
	for (let i in listPurchase) {
		if (listPurchase[i].id === id) {
			listPurchase.splice(i, 1);
			break;
		}
	}
	saveCart();
	totalCart();
}

/*SAVE CART*/
function saveCart() {
	localStorage.setItem("listPurchase", JSON.stringify(listPurchase));
	// mettre a jour total
	totalCart();
}

/*APPLIQUER TOTAL PRIX SUR UN SEUL PRODUIT*/
function countProduct() {
	let totalCount = 0;
	for (let i in listPurchase) {
		totalCount += listPurchase[i].count * listPurchase[i].price;
	}
	return totalCount;
}

console.log(countProduct());

/*APPLIQUER TOTAL COMMANDE*/
function totalCart() {
	let totalCount = 0;
	for (let i in listPurchase) {
		totalCount += listPurchase[i].quantity * listPurchase[i].price;

		//total de la commande html
		let fullCart = document.getElementById("full-cart");
		fullCart.innerText = totalCount + " €";
	}
	return totalCount;
}

console.log(listPurchase);
console.log(totalCart());

/*ENVOI FORMULAIRE*/
function sendOrder() {
	//lier inputs html
	let firstName = document.querySelector("#firstname");
	let lastName = document.querySelector("#lastname");
	let email = document.querySelector("#email");
	let address = document.querySelector("#adresse");
	let zip = document.querySelector("#zip");
	let city = document.querySelector("#city");

	//lier message alert html
	let alertFirstName = document.getElementById("alert-firstname");
	let alertLastName = document.getElementById("alert-lastname");
	let alertEmail = document.getElementById("alert-email");
	let alertAddress = document.getElementById("alert-adresse");
	let alertZip = document.getElementById("alert-zip");
	let alertCity = document.getElementById("alert-city");

	//check regex
	let fullNameValid = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
	let emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	let addressValid = /^([\w\s]+){5,}/;
	let zipValid = /^\d{5}$|^\d{5}-\d{4}$/;
	let cityValid = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

	//valeur initiale
	let formValid = true;

	// mise en place des alertes dur le formulaire
	if (fullNameValid.test(firstName.value) == false) {
		alertFirstName.innerHTML = "Merci de renseigner un prénom valide".className =
			"missingValue";
		formValid = false;
	} else {
		alertFirstName.innerHTML = "";
	}
	if (fullNameValid.test(lastName.value) == false) {
		alertLastName.innerHTML = "Merci de renseigner un Nom valide".className = "missingValue";
		formValid = false;
	} else {
		alertLastName.innerHTML = "";
	}
	if (emailValid.test(email.value) == false) {
		alertEmail.innerHTML = "Merci de renseigner une adresse email valide".className =
			"missingValue";
		formValid = false;
	} else {
		alertEmail.innerHTML = "";
	}
	if (addressValid.test(address.value) == false) {
		alertAddress.innerHTML = "Merci de renseigner une adresse valide".className =
			"missingValue";
		formValid = false;
	} else {
		alertAddress.innerHTML = "";
	}
	if (zipValid.test(zip.value) == false) {
		alertZip.innerHTML = "Merci de renseigner un code postal valide".className = "missingValue";
		formValid = false;
	} else {
		alertZip.innerHTML = "";
	}
	if (cityValid.test(city.value) == false) {
		alertCity.innerHTML = "Merci de renseigner un code postal valide".className =
			"missingValue";
		formValid = false;
	} else {
		alertCity.innerHTML = "";
	}

	//mise en forme pour envoi
	let plugContact = {
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		address: address.value,
		zip: zip.value,
		city: city.value
	};

	let camera_id = []; //tableau orders
	let orderCart = JSON.parse(localStorage.getItem("listPurchase"));
	for (let item of ordercCart) {
		camera_id.push(item._id);
	}

	//final order
	let order = {
		contact: plugContact,
		products: camera_id
	};

	if (formValid) {
		sendApi(JSON.stringify(order)).then(data => {
			console.log(data);
		});
	}

	//*form to api
	fetch("http://localhost:3000/api/cameras/order", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			contact: plugContact,
			products: products
		})
	})
		.then(response => response.json())
		.then(order => {
			localStorage.setItem("orderId", order.orderId);
			window.location.href = "order.html";
		})
		.catch(error => alert("Votre formulaire n'est pas correct !"));
}

/*ENVOYER COMMANDE*/
document.getElementById("submit-order").addEventListener("click", sendOrder);
