/* ENREGISTRER URL */
const URL = "http://localhost:3000/api/cameras";

/*RECUPERER LES CAMERAS DEPUIS L'URL*/

fetch(URL, {method: "GET"})                                         // préciser l'url et la methode 
    .then(response => response.json())                              // convertit le resultat au format json
    .then(cameras => {console.log(cameras);                         // indique le resultat 'camera' sur la console 
        cameras.forEach(camera =>{                                  // indiquer pour chaque produit recuperé une disposition
            appearCamera(camera);                                   // préciser la fonction "présentation"
        });
      })
    .catch(err => console.log("HOUSTON !! we have a problem", err));// si erreur !


/*PRESENTATION DES PRODUITS*/

function appearCamera(camera){                                     
    
    let link = document.createElement("a")                          // integrer un lien page index vers page produit
    link.href = "product.html?id=" + camera._id                     // lié l'id d'un produit 
    link.classList.add("link-product")

    let article = document.createElement("article")                 // créer une enveloppe pour un produit
    article.classList.add("product-list")

    let imgProduct = document.createElement("img")                  // inclure emplacement image produit
    imgProduct.classList.add("img-article","small")                 
    imgProduct.src = camera.imageUrl                                // image spécifique a son produit
    
    let content = document.createElement("span")                    // content name et price
    content.classList.add("product-content")

    let nameProduct = document.createElement("h3")                  // nom du produit
    nameProduct.textContent = camera.name
    nameProduct.classList.add("title-product")                      // nom spécifique a son produit

    let priceProduct = document.createElement("p")                  // prix d'un produit
    priceProduct.classList.add("price")
    priceProduct.textContent = camera.price/100 + "€"               // prix spécifique a son produit
    
    article.appendChild(imgProduct)                                 // un article contient une image et un content(nom et prix)
    article.appendChild(content)
    content.appendChild(nameProduct)
    content.appendChild(priceProduct)
    link.appendChild(article)                                      // lien entourant un article
    document.getElementById("vintage-camera").appendChild(link)    // cibler la div parent de l'article
}

