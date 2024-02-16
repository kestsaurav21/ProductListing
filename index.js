
async function fetchData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const categoryData = await response.json();
    return categoryData;
  } catch (err) {
    console.log(err);
  }
}

async function initiate() {
  const categories = await fetchData();

  const categoryTabsContainer = document.getElementById("categoryTabs");
  const productContainer = document.getElementById("productContainer");

  categories.categories.forEach((category, idx) => {
    const tab = document.createElement("button");
    tab.className = "tab";
    if (idx === 0) {
      tab.classList.add("active");
    }
    tab.textContent = category.category_name;
    tab.addEventListener("click", (e) => {
      const allTabs = document.getElementsByClassName("tab");
      [...allTabs].forEach((item) => {
        if (item.innerText === e.target.innerText) {
          e.target.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      showProducts(category.category_products);
    });
    categoryTabsContainer.appendChild(tab);
  });
  function calculatePercentageOff(originalPrice, discountedPrice) {
    const percentageOff =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(percentageOff);
  }

  // Function to create and display the product card
  function showProducts(products) {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = product.image;
      img.className = "image-card";
      card.appendChild(img);

      if (product.badge_text) {
        const badge = document.createElement("div");
        badge.className = "product-badge";
        badge.textContent = product.badge_text;
        card.appendChild(badge);
      }

      const details = document.createElement("div");
      details.className = "product-details";

      const title = document.createElement("div");
      title.className = "product-title";
      title.textContent = product.title;
      details.appendChild(title);

      const vendor = document.createElement("div");
      vendor.className = "product-vendor";
      vendor.textContent = ` ${product.vendor}`;
      details.appendChild(vendor);

      const info = document.createElement("div");
      info.className = "product-info";

      const price = document.createElement("div");
      price.className = "product-price";
      price.textContent = `$${product.price}`;
      info.appendChild(price);

      const comparePrice = document.createElement("div");
      comparePrice.className = "product-compare-price";
      comparePrice.textContent = `$${product.compare_at_price}`;
      info.appendChild(comparePrice);

      // Calculate percentage off and display
      const percentageOff = calculatePercentageOff(
        parseInt(product.compare_at_price),
        parseInt(product.price)
      );
      const percentageOffDisplay = document.createElement("div");
      percentageOffDisplay.className = "product-percentage-off";
      percentageOffDisplay.textContent = `${percentageOff}%`;
      info.appendChild(percentageOffDisplay);

      // Add to cart button (visual representation)
      const addToCartButton = document.createElement("button");
      addToCartButton.className = "add-to-cart-button";
      addToCartButton.textContent = "Add to Cart";

      card.appendChild(details);
      card.appendChild(info);
      card.appendChild(addToCartButton);

      // Append the product card to the product container
      productContainer.appendChild(card);
    });
  }

  // Initial load
  showProducts(categories.categories[0].category_products);
}

initiate();
