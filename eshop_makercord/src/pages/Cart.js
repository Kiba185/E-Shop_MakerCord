import "./Cart.css";
import { useState } from "react";
import PageHeading from "../components/PageHeading"
import OrderStatus from "../components/Cart/OrderStatus"
import CartProductList from "../components/Cart/CartProductList"
import ShippingPaymentSection from "../components/Cart/ShippingPaymentSection"
import { useCart } from "../context/CartContext"
import CartSummary from "../components/Cart/CartSummary"

const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(1);
  const { cart } = useCart();

  return ( 
    <main className="cart-page">
      <PageHeading>Nákupní košík</PageHeading>
      <OrderStatus orderStatus={orderStatus} />
      <div className="cart-content">
        {
          (() => {
            switch (orderStatus) {
              case 1:
                return (
                  <>
                    <CartProductList products={cart} />
                    <CartSummary setOrderStatus={setOrderStatus} orderStatus={orderStatus} products={cart} />
                  </>
                );
              case 2:
                return (
                  <>
                    <ShippingPaymentSection />
                    <CartSummary setOrderStatus={setOrderStatus} orderStatus={orderStatus} />
                  </>
                );
              case 3:
                return (
                  <>
                    <CartProductList products={cart} />
                    <CartSummary setOrderStatus={setOrderStatus} orderStatus={orderStatus} />
                  </>
                );
              case 4:
                return (
                  <>
                    <CartProductList products={cart} />
                    <CartSummary setOrderStatus={setOrderStatus} orderStatus={orderStatus} />
                  </>
                );
              default:
                return null;
            }
          })()
        }
      </div>
    </main>
  );
}

export default Cart