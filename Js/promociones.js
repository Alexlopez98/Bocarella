function filterPromos(category) {
  const promos = document.querySelectorAll(".promo-card");
  promos.forEach(promo => {
    if (category === "all" || promo.dataset.category === category) {
      promo.style.display = "block";
    } else {
      promo.style.display = "none";
    }
  });
}
