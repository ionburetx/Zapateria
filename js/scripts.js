document.addEventListener("DOMContentLoaded", function() {



function closeMenu() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
function openMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }

document.getElementById("closeMenuButton").addEventListener("click", closeMenu);
document.getElementById("openMenuButton").addEventListener("click", openMenu);
document.getElementById("overlay").addEventListener("click", closeMenu);
});