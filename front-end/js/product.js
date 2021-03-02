/*ENREGISTRER URL*/
const apiUrl = "http://localhost:3000/api/cameras/";

/*RECUPERER L'ID ET URL D'UN PRODUIT*/
const parsedUrl = new URL(window.location.href); //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id");

/*APPLIQUER L'APPARITION D'UN PRODUIT SELECTIONNE*/
fetch(apiUrl + idProduct, { method: "GET" })
	.then(response => response.json())
	.then(camera => {
		appearCamera(camera);
		appearOption(camera);

		let cart = document.querySelector("#add-product");
		cart.addEventListener("click", () => {
			addProduct(camera);
		});
	})
	.catch(err => console.log("HOUSTON !! we have a problem", err));

/*PRESENTATION PRODUIT SELECTIONNE*/
function appearCamera(camera) {
	let article = document.createElement("article");
	article.classList.add("product-list");

	let imgProduct = document.createElement("img");
	imgProduct.classList.add("img-article", "small");
	imgProduct.src = camera.imageUrl;

	let content = document.createElement("span");
	content.classList.add("product-content");

	let nameProduct = document.createElement("h3");
	nameProduct.textContent = camera.name;
	nameProduct.classList.add("title-product");

	let priceProduct = document.createElement("p");
	priceProduct.classList.add("price");
	priceProduct.textContent = camera.price / 100 + "€";

	let description = document.createElement("p");
	description.textContent = camera.description;
	description.classList.add("infos-article");

	let addCartButton = document.createElement("button");
	addCartButton.id = "add-product";
	addCartButton.textContent = "Ajouter";

	article.appendChild(imgProduct); // <article>
	article.appendChild(content); // <div>
	content.appendChild(nameProduct); // <h3>
	content.appendChild(priceProduct); // <p>
	article.appendChild(description); // <p>
	article.appendChild(addCartButton); // <button>
	document.getElementById("vintage-camera").appendChild(article);
}

/*CHOIX DE LENTILLES*/
function appearOption(camera) {
	let lens = document.createElement("select");
	lens.classList.add("select-lens");

	for (let i = 0; i < camera.lenses.length; i++) {
		let optionLens = document.createElement("option");
		optionLens.setAttribute("value", camera.lenses[i]);
		optionLens.textContent = camera.lenses[i];
		lens.appendChild(optionLens);
	}
}

/*INDIQUER L'AJOUT AU PANIER/LOCALSTORAGE*/
function addProduct(camera) {
	let listPurchase = JSON.parse(localStorage.getItem("listPurchase")) || [];

	const itemToAdd = {
		id: idProduct,
		name: camera.name,
		image: camera.imageUrl,
		quantity: 1,
		price: camera.price
	};
	let itemExist = false;

	listPurchase.forEach(item => {
		// acces aux elements (boucle)

		if (item.id === itemToAdd.id) {
			// si le produit existe
			item.quantity++; // incrémenter sa quantité
			itemExist = true;
		}
	});

	if (!itemExist) {
		// si le produit n'existe pas
		listPurchase.push(itemToAdd);
	}
	localStorage.setItem("listPurchase", JSON.stringify(listPurchase)); // mise a jour LS
}
