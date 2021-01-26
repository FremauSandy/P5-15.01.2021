/* ENREGISTRER URL */
const URL = "http://localhost:3000/api/cameras";

/*RECUPERER LES CAMERAS DEPUIS L'URL*/

fetch(URL, {method: "GET"})
    .then(response => response.json())                      /*convertit le resultat au format json*/
    .then(cameras => {console.log(cameras);                 /*converti le resultat sur la console*/  
        cameras.forEach(camera =>{
            appearCamera(camera);
        });
        let cart = document.querySelectorAll(".add-cart"); /*Afin que les resultats de la promesse soient pris en compte*/ 
        console.log(cart);                                 /*selection du <A> "Ajouter"*/ 

        for (let i = 0; i < cart.length; i++) {            /*préciser l'action "ajout"*/   
            cart[i].addEventListener('click', () => {      /*déclencheur click*/ 
            console.log('added to cart');                  /*appliquer le résultat dans console*/
            cartNumbers(cart[i].dataset.product);            
        })
}
      })
    .catch(err => console.log("Houston we have a problem", err)); /*si erreur !*/

/*CIBLER LES CONTENEURS PAGE INDEX*/
function appearCamera(camera){                                     
    
    let Article = document.createElement("article")                 // créer une envloppe pour un produit
    document.getElementById("product-choice").appendChild(Article)    // cibler la div parent de l'article
    Article.classList.add("product-list")

    let imgProduct = document.createElement("img")                  // inclure emplacement image produit
    imgProduct.classList.add("img-article","small")                 // ajout d'une classe 
    imgProduct.src = camera.imageUrl

    let nameProduct = document.createElement("h3")                  // indiquer le "nom" du produit
    nameProduct.textContent = camera.name

    let description = document.createElement("p")                   // description Lorem ...
    description.textContent = camera.description

    Article.appendChild(imgProduct)
    content.appendChild(nameProduct)
    Article.appendChild(description)
    
}