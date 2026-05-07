import usersJson from "./data/users.json";
import productsJson from "./data/products.json";
import product_img_1 from "./images/products_images/product_img_1.jpg";
import product_img_2 from "./images/products_images/product_img_2.jpg";
import product_img_3 from "./images/products_images/product_img_3.jpg";
import product_img_4 from "./images/products_images/product_img_4.jpg";
import product_img_5 from "./images/products_images/product_img_5.jpg";
import product_img_6 from "./images/products_images/product_img_6.jpg";
import product_img_7 from "./images/products_images/product_img_7.jpg";
import product_img_8 from "./images/products_images/product_img_8.jpg";
import product_img_9 from "./images/products_images/product_img_9.jpg";
import product_img_10 from "./images/products_images/product_img_10.jpg";
import product_img_11 from "./images/products_images/product_img_11.jpg";
import product_img_12 from "./images/products_images/product_img_12.jpg";
import product_img_13 from "./images/products_images/product_img_13.jpg";
import product_img_14 from "./images/products_images/product_img_14.jpg";
import product_img_15 from "./images/products_images/product_img_15.jpg";

export const users = usersJson;

const imageMap = {
  "product_img_1.jpg": product_img_1,
  "product_img_2.jpg": product_img_2,
  "product_img_3.jpg": product_img_3,
  "product_img_4.jpg": product_img_4,
  "product_img_5.jpg": product_img_5,
  "product_img_6.jpg": product_img_6,
  "product_img_7.jpg": product_img_7,
  "product_img_8.jpg": product_img_8,
  "product_img_9.jpg": product_img_9,
  "product_img_10.jpg": product_img_10,
  "product_img_11.jpg": product_img_11,
  "product_img_12.jpg": product_img_12,
  "product_img_13.jpg": product_img_13,
  "product_img_14.jpg": product_img_14,
  "product_img_15.jpg": product_img_15,
};

const products = productsJson.map((product) => ({
  ...product,
  image: imageMap[product.image] || product.image,
}));

export default products;
