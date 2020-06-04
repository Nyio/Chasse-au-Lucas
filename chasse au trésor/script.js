/* 
    Auteur		: VINEY Nowlan 
    Date créat.	: 22/03/2020
    Description	: Chasse au trésor 
*/

//initialisation de certaines variables
let coordonneeX = Math.floor(Math.random() * 8);
let coordonneeY = Math.floor(Math.random() * 8);                        //tirage aléatoire des coordonnées du trésor
var idLucas = String(coordonneeX) + '-' + String(coordonneeY);         //id du trésor en fonction de ses coordonnées
let compteur = 0;                                                       
let monTableau = Tableau2D(8, 8);                                       
let tableau = "<table id='fondtable'><tr>";
let commentaire = "Trouves Lucas devant le lycée.<br />";      

//création des 2 groupes de surveillants ayant des coordonnées différentes de celles du trésor
let coordonneeXSurveillant1 = 0;
let coordonneeYSurveillant1 = 0;
do {
    coordonneeXSurveillant1 = Math.floor(Math.random() * 8);
    coordonneeYSurveillant1 = Math.floor(Math.random() * 8); 
} while (coordonneeXSurveillant1 == coordonneeX && coordonneeYSurveillant1 == coordonneeY);
let idSurveillant1 = String(coordonneeXSurveillant1) + '-' + String(coordonneeYSurveillant1);
//console.log("id surveillant 1 : " + idSurveillant1);

let coordonneeXSurveillant2 = 0;
let coordonneeYSurveillant2 = 0;
do {
    coordonneeXSurveillant2 = Math.floor(Math.random() * 8);
    coordonneeYSurveillant2 = Math.floor(Math.random() * 8); 
} while (coordonneeXSurveillant2 == coordonneeX && coordonneeYSurveillant2 == coordonneeY || coordonneeXSurveillant2 == coordonneeXSurveillant1 && coordonneeYSurveillant2 == coordonneeYSurveillant1);
let idSurveillant2 = String(coordonneeXSurveillant2) + '-' + String(coordonneeYSurveillant2);
//console.log("id surveillant 2 : " + idSurveillant2);

//création de la principale ayant des coordonnées différentes de celles du trésor
let coordonneeXPrincipale = 0;
let coordonneeYPrincipale = 0;
do {
    coordonneeXPrincipale = Math.floor(Math.random() * 8);
    coordonneeYPrincipale = Math.floor(Math.random() * 8); 
} while (coordonneeXPrincipale == coordonneeX && coordonneeYPrincipale == coordonneeY);
let idPrincipale = String(coordonneeXPrincipale) + '-' + String(coordonneeYPrincipale);
//console.log("id principale : " + idPrincipale);


//fonction qui renvoit un tableau 2D
function Tableau2D(x, y) {
    var array2D = new Array(x);
    for (var i = 0; i < array2D.length; i++) {
        array2D[i] = new Array(y);
    }
    return array2D;
}


//fonction qui vérifie que la page soit complètement chargée avant de lancer la fonction initTab
window.onload = function() { initTab(); }


//fonction qui créer le tableau et place le trésor
function initTab() {
    monTableau[coordonneeX][coordonneeY] = "";
    //console.log("id lucas : " + idLucas);

    
    for (y = 0; y < monTableau.length; y++){
        tableau = tableau + "<tr>";
            for (i = 0; i < monTableau.length; i++){
                if (monTableau[y][i] != monTableau[coordonneeX][coordonneeY]){
                    monTableau[y][i] = " ";
                }
                tableau = tableau + "<td id=" + String(y) + "-" + String(i) + " onclick='choix(this.id)'; >" + monTableau[y][i] + "</td>";  //definir les id de chaques cases du tableau
            }
        tableau = tableau + "</tr>";
    }
    tableau = tableau + "</tr></table>"
    document.getElementById("emplacementTable").innerHTML = tableau;
}



//fonction qui récupère l'ID de la case cliquée et traite le résultat
function choix(id){
    caseTable = document.getElementById(id);
    //si clique sur le trésor
    if (id == idLucas){
        
        caseTable.setAttribute('class', 'good');        //changement de couleur
        console.log("Gagné");

        for (y = 0; y < monTableau.length; y++){
            for (i = 0; i < monTableau.length; i++){
                let caseId = y + "-" + i;
                document.getElementById(caseId).setAttribute('onclick', '');        //boucle qui permet de bloquer toutes les cases apres avoir trouvé le trésor
            }        
        }
        compteur++;
        afficherCompteur(compteur);
        afficherVictoire(); 
    
    //si clique sur un groupe de surveillant
        } else if (id == idSurveillant1 || id == idSurveillant2){

            caseTable.setAttribute('class', 'surveillant');      //changement de couleur
            caseTable.setAttribute('onclick', '');          //désactivation du onclick de la case pour empêcher le joueur de cliquer une nouvelle fois dessus
            compteur = compteur + 4;
            afficherCompteur(compteur);
            afficherCommentaire("</br><strong>Nowlan :</strong> T'es tombé sur un groupe de surveillant <br /> Tu perds 4 minutes !<br /></br>");

    //si clique sur la principale
    } else if (id == idPrincipale || id == idPrincipale){

        caseTable.setAttribute('class', 'principale');      //changement de couleur
        caseTable.setAttribute('onclick', '');          //désactivation du onclick de la case pour empêcher le joueur de cliquer une nouvelle fois dessus
        compteur = compteur + 10;
        afficherCompteur(compteur);
        afficherCommentaire("</br><strong>Nowlan :</strong> T'es tombé sur un groupe de surveillant <br /> Tu perds 4 minutes !<br /></br>");

    
    //si clique sur la bonne ligne
    } else if (id == coordonneeX + "-0" || id == coordonneeX + "-1" || id == coordonneeX + "-2" || id == coordonneeX + "-3" || id == coordonneeX + "-4" || id == coordonneeX + "-5" || id == coordonneeX + "-6" || id == coordonneeX + "-7"){
        
        caseTable.setAttribute('class', 'ligne');       //changement de couleur
        caseTable.setAttribute('onclick', '');          //désactivation du onclick de la case
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("<strong>Nowlan :</strong> Lucas se trouve sur cette ligne !<br />");

    //si clique sur la bonne colonne
    } else if (id == "0-" + coordonneeY || id == "1-" + coordonneeY || id == "2-" + coordonneeY || id == "3-" + coordonneeY || id == "4-" + coordonneeY || id == "5-" + coordonneeY || id == "6-" + coordonneeY || id == "7-" + coordonneeY){

        caseTable.setAttribute('class', 'colonne');     //changement de couleur
        caseTable.setAttribute('onclick', '');          //désactivation du onclick de la case
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("<strong>Nowlan :</strong> Lucas se trouve sur cette colonne !<br />");

        

    //si clique sur une mauvaise case
    } else {


        caseTable.setAttribute('class', 'bad');         //changement de couleur
        caseTable.setAttribute('onclick', '');          //désactivation du onclick de la case         
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("<strong>Nowlan :</strong> Continues je sens qu'on se rapproche ! <br />");
    }
}


//affche le compteur
function afficherCompteur(valeur){
    document.getElementById("compte").innerHTML = valeur;
}

//affiche les commentaires
function afficherCommentaire(message){

    commentaire = message + commentaire;

    document.getElementById("emplacementCommentaires").innerHTML = commentaire;
}

//affiche la fin du jeu ainsi qu'un bouton qui reload la page pour rejouer
function afficherVictoire(){
    message = "<img src='ressources/LucasJuL.jpg' classe='image' /><br /><br /><strong>Super, tu as trouvé Lucas en " + compteur + " minutes ! Le prof va pouvoir lui mettre -500 points !</strong><br /><br /> <button onclick='window.location.reload(false)'> Rejouer </button>"
    document.getElementById("emplacementCommentaires").innerHTML = message;
}