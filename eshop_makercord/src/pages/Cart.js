import "./Cart.css";
import { useState } from "react";
import PageHeading from "../components/PageHeading"
import OrderStatus from "../components/OrderStatus"
import CartProductList from "../components/CartProductList"
import { useCart } from "../context/CartContext"
import CartSummary from "../components/CartSummary"

const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(1);
  const { cart } = useCart();

  return ( 
    <main className="cart-page">
      <PageHeading>Nákupní košík</PageHeading>
      <OrderStatus orderStatus={orderStatus} />
      <div className="cart-content">
        <CartProductList products={cart} />
        <CartSummary setOrderStatus={setOrderStatus} />
      </div>
    </main>
  );
}

export default Cart