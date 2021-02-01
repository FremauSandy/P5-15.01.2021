// 1.recuperer le localstorage "panier" 
// 2.recuperer les produits du panier avec methode Get utilisé dans product (id) boucle pour recuperer id
// 3.afficher les produits du panier (for each)
// 4. faire product.js

/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";
const firstURL = "http://localhost:3000/api/cameras";

//cart = button html "ajouter"
//appearCart = présentation des produits dans page cart
//panier = produits dans localstorage

/*RECUPERER L'ID ET URL D'UN PRODUIT */
const parsedUrl = new URL(window.location.href);                  //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id");               // indique un Id précis en fonction du produit selectionné

/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
let panier = JSON.parse(localStorage.getItem('panier'));          // accéder au localstorage
console.log(panier)

fetch(firstURL, {method: "GET"})                                        
    .then(response => response.json())                              
    .then(cameras => {console.log(cameras);                         
        cameras.forEach(camera =>{                                  
            appearCart(camera);                                   
        });
      })

/*VERIFICATION DU CONTENU PANIER*/
function manageCart() {
  
  if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "[]") {  // si le panier contient un produit
    document.querySelector("#cart-infos").parentNode.hidden = true;                          // affiche le contenu
  } else {
    document.querySelector("#cart-infos").parentNode.hidden = false;                         // n'affiche pas le contenu
  }
}

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/ 
function appearCart(camera){

  let itemContent = document.createElement('div')                 // conteneur pour un produit
      itemContent.classList.add("item-content")

  let imgProduct = document.createElement("img")                  // image produit
      imgProduct.src = camera.imageUrl

  let content = document.createElement("span")                    // content name et price
  
  let nameProduct = document.createElement("h3")                  // nom du produit
      nameProduct.textContent = camera.name
  
  let priceProduct = document.createElement("p")                  // prix d'un produit
      priceProduct.textContent = camera.price/100 + "€"
  
  let lens = document.createElement("select")                     // choix de lentilles
      lens.classList.add("select-lens")

    itemContent.appendChild(imgProduct)
    itemContent.appendChild(content)
      itemContent.appendChild(nameProduct)
      itemContent.appendChild(priceProduct)
    itemContent.appendChild(lens)

  document.getElementById("cart-items").appendChild(itemContent)  // cibler la div parent de l'article
}

