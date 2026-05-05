import usersJson from "./data/users.json";
import productsJson from "./data/products.json";
import image1 from "./images/product1.jpg";
import image2 from "./images/product2.jpg";
import image3 from "./images/product3.jpg";

export const users = usersJson;

const imageMap = {
  "product1.jpg": image1,
  "product2.jpg": image2,
  "product3.jpg": image3,
};

const products = productsJson.map((product) => ({
  ...product,
  image: imageMap[product.image] || product.image,
}));

export default products;
