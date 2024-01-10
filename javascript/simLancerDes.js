// Lancer des dés
function lancerDe() {
  const imageDes = document.getElementById("imageDes");

  let nombreFaces = parseInt(document.querySelector('input[name="deFaces"]:checked').value)
  let nombreRandom = Math.floor(Math.random() * nombreFaces) + 1;
  console.log("le dé :", nombreFaces, "a donné le résultat " + nombreRandom)
  imageDes.src = "img/Die" + nombreRandom + ".png"
}

const clickButton = document.getElementById("lancerDe");

clickButton.addEventListener("click", function(event) {
  event.preventDefault();
  lancerDe();
});