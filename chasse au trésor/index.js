// Tableau2D renvoit un objet tableau en 2D
function Tableau2D(x, y) {
	var array2D = new Array(x);
	for (var i = 0; i < array2D.length; i++) {
		array2D[i] = new Array(y);
	}
	return array2D;
}

// choix() récupère l'ID de la case cliquée et traite le résultat
var message = "";
function choix(id) {
	caseTable = document.getElementById(id);
	if (id == idLucas) {
		caseTable.setAttribute('class', 'good');
		msg("vous venez de trouver le trésor en "+ compteur + " trous.");
		for (y = 0; y< monTableau.length; y++){
			for (i = 0; i < monTableau.length; i++){
				let caseId = y + "-" + i;
				document.getElementById(caseId).setAttribute('onclick','');
			}
		}
	} else {
		msg("<br/> essaie encore !");
		caseTable.setAttribute('class', 'bad');
		caseTable.setAttribute('onclick','')
	}
	AfficherCompteur();
}
function msg(commentaire){
	document.getElementById("commentaires").innerHTML = commentaire;
}

let monTableau = new Tableau2D(8,8);
let coordoneX = Math.floor(Math.random() * 8);
let coordoneY = Math.floor(Math.random() * 8);
monTableau[coordoneX][coordoneY] = "lucas";
// AfficherCompteur() permet d'afficher la variable compteur à l'emplacement voulu.
// affichera plus tard des commentaires.
var compteur = 0;
function AfficherCompteur() {
	compteur = compteur + 1;
	document.getElementById("compte").innerHTML = compteur;

}
// onload vérifie que la page soit complètement chargée avant de lancer la fonction
window.onload = function() { initTab(); }
// -----------------------------------------------------------------------------
// initTab() affiche le tableau et choisit les coordonnées du trésor
var idLucas = String(coordoneX) + "-" + String(coordoneY);
function initTab() {
	var compteur = 0;
	let monTableau = Tableau2D(8,8);
	monTableau[coordoneX][coordoneY] = "lucas";
	let tableau="<table id='fondtable'>";
	for (var i = 0;i < monTableau.length; i++){
		tableau=tableau + "<tr>";
		for (var x = 0; x < monTableau.length; x++) {
			if (monTableau[i][x] != monTableau[coordoneX][coordoneY]){
				monTableau[i][x] = "";
			}else{
				monTableau[i][x] == monTableau[coordoneX][coordoneY]
				monTableau[i][x] = "";
			}
			tableau = tableau + "<td id=" + String(i) + "-" + String(x) +" onclick ='choix(this.id)'>" + monTableau[i][x] + "</td>"
		}
		tableau = tableau + "</tr>";
	}
	tableau = tableau + "</table>";
	document.getElementById("emplacementTable").innerHTML = tableau;
	document.getElementById("commentaires").innerHTML = "";
	return monTableau;
}

