/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
const listPurchase = JSON.parse(localStorage.getItem("listPurchase"));

if (!localStorage.getItem("listPurchase")) {
	alert("Votre panier est vide!");
}

if (listPurchase) {
	listPurchase.forEach(item => {
		appearCart(item);
		totalCart();
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
	totalProduct.textContent = "=" + (item.price / 100) * item.quantity + "€";

	/*ACTION SUPPRESSION UNITE*/
	let btnRemove = document.createElement("button");
	btnRemove.classList.add("remove");
	btnRemove.textContent = "Supprimer";
	btnRemove.addEventListener("click", e => {
		let buttonClicked = e.target;
		buttonClicked.parentElement.parentElement.parentElement.remove();
		removeItemFromCart(item.id);
		saveCart();
	});

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
		location.reload();
		saveCart();
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
}

/*SAVE CART*/
function saveCart() {
	localStorage.setItem("listPurchase", JSON.stringify(listPurchase));
	totalCart();
}

/*APPLIQUER TOTAL PRIX SUR UN SEUL PRODUIT*/
function countProduct() {
	const listPurchase = JSON.parse(localStorage.getItem("listPurchase"));
	let totalCount = 0;
	for (let i in listPurchase) {
		totalCount += listPurchase[i].count * listPurchase[i].price;

		//total prix produit par sa quantité html
		let priceProd = document.getElementsByClassName("select-price");
	}
	return totalCount;
}

/*APPLIQUER TOTAL COMMANDE*/
function totalCart() {
	let totalCount = 0;
	for (let i in listPurchase) {
		totalCount += listPurchase[i].quantity * listPurchase[i].price;

		//total de la commande html
		let fullCart = document.getElementById("full-cart");
		fullCart.innerText = totalCount / 100 + " €";
	}
	return totalCount;
}

/*FORM TO API*/
const toApi = async function (data) {
	let reponse = await fetch("http://localhost:3000/api/cameras/order", {
		method: "POST",
		body: data,
		headers: {
			"Content-type": "application/json"
		}
	});

	if (reponse.ok) {
		let infos = await reponse.json();
		window.location = "order.html?OrderId=" + infos.orderId;
	} else {
		alert("erreur" + reponse.status);
	}
};

/*ENVOI FORMULAIRE*/
function sendOrder() {
	let firstName = document.querySelector("#firstname");
	let lastName = document.querySelector("#lastname");
	let email = document.querySelector("#email");
	let address = document.querySelector("#adresse");
	let zip = document.querySelector("#zip");
	let city = document.querySelector("#city");

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
		alertFirstName.innerHTML = "Merci de renseigner un prénom valide";
		formValid = false;
	}
	if (fullNameValid.test(lastName.value) == false) {
		alertLastName.innerHTML = "Merci de renseigner un Nom valide";
		formValid = false;
	}
	if (emailValid.test(email.value) == false) {
		alertEmail.innerHTML = "Merci de renseigner une adresse email valide";
		formValid = false;
	}
	if (addressValid.test(address.value) == false) {
		alertAddress.innerHTML = "Merci de renseigner une adresse valide";
		formValid = false;
	}
	if (zipValid.test(zip.value) == false) {
		alertZip.innerHTML = "Merci de renseigner un code postal valide";
		formValid = false;
	}
	if (cityValid.test(city.value) == false) {
		alertCity.innerHTML = "Merci de renseigner un code postal valide";
		formValid = false;
	}

	//mise en forme pour envoi
	let plugContact = {
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		address: address.value,
		city: zip.value + " " + city.value
	};

	let camera_id = []; //tableau orders

	let orderCart = JSON.parse(localStorage.getItem("listPurchase"));
	for (let item of orderCart) {
		camera_id.push(item.id);
	}

	//final order
	let order = {
		contact: plugContact,
		products: camera_id
	};

	if (formValid) {
		toApi(JSON.stringify(order));
	}
}
/*ENVOYER COMMANDE*/
document.getElementById("form-cart").addEventListener("submit", function (event) {
	event.preventDefault();
	sendOrder();
});
