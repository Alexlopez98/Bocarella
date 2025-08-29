const carouselGames = [
  { id: "DUOPEPPE", imagen: "../Img/BANNERS/PROMOS/DUOPEPPE.png", link: "zelda.html" },
  { id: "DUOPEPPE2", imagen: "../Img/BANNERS/PROMOS/DUOPEPPE.png", link: "uncharted4.html" },
  { id: "DUOPEPPE3", imagen: "../Img/BANNERS/PROMOS/DUOPEPPE.png", link: "dragonball.html" },
];

const indicatorsContainer = document.getElementById("carousel-indicators");
const innerContainer = document.getElementById("carousel-inner");

carouselGames.forEach((game, index) => {
    // Crear indicador
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicator.setAttribute("data-bs-slide-to", index);
    if (index === 0) indicator.classList.add("active");
    indicator.setAttribute("aria-current", index === 0 ? "true" : "false");
    indicator.setAttribute("aria-label", `Slide ${index + 1}`);
    indicatorsContainer.appendChild(indicator);

    // Crear carousel item
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    const link = document.createElement("a");
    link.href = game.link;

    const img = document.createElement("img");
    img.src = game.imagen;
    img.classList.add("d-block", "w-100");
    img.alt = game.id;

    link.appendChild(img);
    item.appendChild(link);
    innerContainer.appendChild(item);
});
