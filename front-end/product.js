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

/*CIBLER LES CONTENEURS PAGE PRODUCT (+INPUT)*/
function appearCamera(camera){                                     
    
    let Article = document.createElement("article")                 // créer une envloppe pour un produit
    document.getElementById("vintage-camera").appendChild(Article)  // cibler la div parent de l'article
    Article.classList.add("product-list")

    let imgProduct = document.createElement("img")                  // inclure emplacement image produit
    imgProduct.classList.add("img-article","small")                 // ajout d'une classe 
    imgProduct.src = camera.imageUrl
    
    let content = document.createElement("span")                    // content name et price

    let nameProduct = document.createElement("h3")                  // indiquer le "nom" du produit
    nameProduct.textContent = camera.name

    let priceProduct = document.createElement("p")                  // element prix
    priceProduct.classList.add("price")
    priceProduct.textContent = camera.price/100 + "€"               // prix d'une camera

    let description = document.createElement("p")                   // description Lorem ...
    description.textContent = camera.description

    let Lens = document.createElement("select")                    // élément choix de lentilles
    Lens.classList.add("select-lens")

    let addCart = document.createElement("button")                 // lien ajouter au panier
    addCart.classList.add("add-cart")
    addCart.dataset.product = camera._id
    addCart.textContent = "Ajouter"
    

    Article.appendChild(imgProduct)
    Article.appendChild(content)
    content.appendChild(nameProduct)
    content.appendChild(priceProduct)
    Article.appendChild(description)
    Article.appendChild(Lens)
    Article.appendChild(addCart)
}


/*indiquer le nombre de produits ajouter au panier*/ 
function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');      /*indiquer au localStorage l'ajout d'un produit*/

    if( productNumbers) {                                           /*indiquer au localStorage l'ajout d'autres produits*/
        const getJson = JSON.parse(productNumbers); // transforme en tableau
        getJson.push(products)                      // push dans tableau
        const nbProducts = getJson.length;          // definit le nbr d'objets contenu dans le tableau 

        localStorage.setItem('cartNumbers', JSON.stringify(getJson));
        document.querySelector('.store span').textContent = nbProducts;      /* afficher un ajout sur l'icone panier*/
        }                                                                    /*résultat du autre ajout*/ 
        else{
            localStorage.setItem('cartNumbers', JSON.stringify([products])); /*OU résultat sans ajout*/ 
            document.querySelector('.store span').textContent = 1;

        }
}