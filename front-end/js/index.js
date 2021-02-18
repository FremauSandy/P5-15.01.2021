/* ENREGISTRER URL */
const URL = "http://localhost:3000/api/cameras";

/*RECUPERER LES CAMERAS DEPUIS L'URL*/

fetch(URL, { method: "GET" })
	.then(response => response.json()) // convertit le resultat au format json*/
	.then(cameras => {
		cameras.forEach(camera => {
			appearCamera(camera);
		});
	})
	.catch(err => console.log("HOUSTON !! we have a problem", err));

/*CIBLER LES CONTENEURS PAGE*/

function appearCamera(camera) {
	let link = document.createElement("a");
	link.href = "product.html?id=" + camera._id;
	link.classList.add("link-product");

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

	article.appendChild(imgProduct);
	article.appendChild(content);
	content.appendChild(nameProduct);
	content.appendChild(priceProduct);
	link.appendChild(article);
	document.getElementById("vintage-camera").appendChild(link);
}
