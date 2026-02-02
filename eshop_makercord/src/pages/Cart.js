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

      <div className="cart-container">
        <OrderStatus orderStatus={orderStatus} />

        <div className="cart-body">
          <CartProductList products={cart} />
          <CartSummary />
        </div>

      </div>
    </main>
  );
}

export default Cart