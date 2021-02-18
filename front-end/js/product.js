/*ENREGISTRER URL*/
const apiUrl = "http://localhost:3000/api/cameras/";

/*RECUPERER L'ID ET URL D'UN PRODUIT*/
const parsedUrl = new URL(window.location.href); //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id");
const imgProduct = parsedUrl.searchParams.get("imageUrl");
const priceProduct = parsedUrl.searchParams.get("price");

/*APPLIQUER L'APPARITION D'UN PRODUIT SELECTIONNE*/
fetch(apiUrl + idProduct, { method: "GET" })
	.then(response => response.json())
	.then(camera => {
		console.log(camera);
		appearCamera(camera);
		appearOption(camera);

		let cart = document.querySelector("#add-cart");
		console.log(cart);
		cart.addEventListener("click", () => {
			addCart();
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
	addCartButton.id = "add-cart";
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

	lens.addEventListener("Selectionner votre lentille", e => {
		const lensChoice = document.getElementsByClassName("select-lens").value;
		localStorage.setItem("lens", lensChoice);
	});
	document.getElementById("add-cart").before(lens);
}

/*INDIQUER L'AJOUT AU PANIER/LOCALSTORAGE*/
function addCart() {
	let listPurchase = localStorage.getItem("listPurchase");

	const itemToAdd = {
		id: idProduct,
		image: imgProduct,
		quantity: 1,
		price: priceProduct
	};

	if (listPurchase) {
		const tabResult = JSON.parse(listPurchase);
		let itemExist = false;
		tabResult.forEach(item => {
			// acces aux elements (boucle)

			if (item.id === itemToAdd.id) {
				// si le produit existe deja dans le localstorage, on augmente uniquement sa quantité

				item.quantity = parseInt(item.quantity) + 1; // incrémenter sa quantité
				itemExist = true;
			}
		});

		if (!itemExist) {
			tabResult.push(itemToAdd);
		}
		const nbProducts = tabResult.length;
		document.querySelector(".store span").textContent = nbProducts; //indique nbr de produits induits
		localStorage.setItem("listPurchase", JSON.stringify(tabResult));
	} else {
		localStorage.setItem("listPurchase", JSON.stringify([itemToAdd]));
		document.querySelector(".store span").textContent = 1;
	}
	console.log(listPurchase);
}

// regler span header quand il y a deja des articles dans localstorage
// regler quantité
