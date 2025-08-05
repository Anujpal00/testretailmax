import "./style.css";
import { showProductContainer } from "./homeProductCards";

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector("#productContainer");
  const productTemplate = document.querySelector("#productTemplate");

  if (!productContainer || !productTemplate) {
    console.error("Missing product container or template in DOM.");
    return;
  }

  fetch('/api/products.json')
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched products:", data);
      showProductContainer(data, productContainer, productTemplate);
    })
    .catch((err) => {
      console.error("Failed to fetch products:", err);
    });
});
