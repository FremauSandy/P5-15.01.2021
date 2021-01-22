/* ENREGISTRER URL */
const URL = "http://localhost:3000/api/cameras";

/*RECUPERER LES PRODUITS DANS LA CONSOLE*/

fetch(URL, {method: "GET"})
    .then(response => response.json())                               //convertit le resultat au format json
    .then(cameras => {console.log(cameras);                          //converti le resultat sur la console   // création de l'article dans le div parent
        cameras.forEach(camera =>{
            appearCamera(camera);
        });
      })
    .catch(err => console.log("Houston we have a problem", err));              //si erreur !

/*AFFICHER LES PRODUITS*/
function appearCamera(camera){                                      // création d'un article présentant un produit
    const Article = document.createElement("article");              // création d'un article présentant un produit
    Article.innerHTML += '<img class=img-article small src=${camera.img}><span><h3>${camera.name}</h3><p>${camera.price}</p></span><p class=description>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> <select class="select-lens" name="lens" id="choice-lens"></select><button>Ajouter</button>';
    Article.classList.add("product-list");                          // ajout d'une classe 

    document.getElementById("vintage-camera").appendChild(Article); // cibler la div parent de l'article
}
      



