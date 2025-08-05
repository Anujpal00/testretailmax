import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

// Fetch product data from JSON
fetch('/api/products.json')
  .then((res) => res.json())
  .then((products) => {
    console.log(products); // ✅ Make sure the data is fetched

    let cartProducts = getCartProductFromLS();

    let filterProducts = products.filter((curProd) => {
      return cartProducts.some((curElem) => curElem.id === curProd.id);
    });

    console.log(filterProducts); // ✅ Check filtered products

    const showCartProduct = () => {
      filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;

        let productClone = document.importNode(templateContainer.content, true);

        const lSActualData = fetchQuantityFromCartLS(id, price);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;

        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lSActualData.price;

        productClone
          .querySelector(".stockElement")
          .addEventListener("click", (event) => {
            incrementDecrement(event, id, stock, price);
          });

        productClone
          .querySelector(".remove-to-cart-button")
          .addEventListener("click", () => removeProdFromCart(id));

        cartElement.appendChild(productClone);
      });
    };

    // Show the cart products after filtering
    showCartProduct();

    // Update the total price
    updateCartProductTotal();
  })
  .catch((err) => {
    console.error("Failed to fetch products:", err);
  });
