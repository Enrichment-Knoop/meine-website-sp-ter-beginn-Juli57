// Einfaches Beispiel für Interaktivität
const button = document.getElementById("colorButton");

button.addEventListener("click", () => {
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === "lightblue" ? "#f9f9f9" : "lightblue";
});
