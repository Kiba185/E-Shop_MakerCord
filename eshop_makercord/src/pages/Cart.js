import "./Cart.css";
import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading/PageHeading"
import OrderStatus from "../components/Cart/OrderStatus"
import CartProductList from "../components/Cart/CartProductList"
import ShippingPaymentSection from "../components/Cart/ShippingPaymentSection"
import { useCart } from "../context/CartContext"
import CartSummary from "../components/Cart/CartSummary"
import DeliveryDetails from "../components/Cart/DeliveryDetails"
import Summary from "../components/Cart/Summary"

const ORDER_STATUS_STORAGE_KEY = "cartOrderStatus";

const Cart = () => {
  const { cart, isDeliveryDetailsComplete, resetCheckoutState } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderStatus, setOrderStatus] = useState(() => {
    try {
      const raw = localStorage.getItem(ORDER_STATUS_STORAGE_KEY);
      const parsed = Number(raw);
      return parsed >= 1 && parsed <= 4 ? parsed : 1;
    } catch (e) {
      return 1;
    }
  });

  useEffect(() => {
    if (orderCompleted) {
      return;
    }

    let nextStatus = orderStatus;

    if (cart.length === 0) {
      nextStatus = 1;
    } else if (!isDeliveryDetailsComplete && orderStatus > 3) {
      nextStatus = 3;
    }

    if (nextStatus !== orderStatus) {
      setOrderStatus(nextStatus);
      return;
    }

    try {
      localStorage.setItem(ORDER_STATUS_STORAGE_KEY, String(orderStatus));
    } catch (e) {}
  }, [cart.length, isDeliveryDetailsComplete, orderCompleted, orderStatus]);

  const handleCompleteOrder = () => {
    resetCheckoutState();
    setOrderCompleted(true);
    setOrderStatus(1);

    try {
      localStorage.removeItem(ORDER_STATUS_STORAGE_KEY);
    } catch (e) {}
  };

  return ( 
    <main className="cart-page">
      <PageHeading>Nákupní košík</PageHeading>
      {orderCompleted ? (
        <section className="order-finished-message">
          <h3>Vaše objednávka byla úspěšne dokončena.</h3>
        </section>
      ) : (
        <>
      <OrderStatus orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
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
                    <CartSummary setOrderStatus={setOrderStatus} orderStatus={orderStatus} products={cart}/>
                  </>
                );
              case 3:
                return (
                  <>
                    <DeliveryDetails />
                    <CartSummary setOrderStatus={setOrderStatus} orderStatus={orderStatus} products={cart}/>
                  </>
                );
              case 4:
                return (
                  <>
                    <Summary setOrderStatus={setOrderStatus} onCompleteOrder={handleCompleteOrder} />
                  </>
                );
              default:
                return null;
            }
          })()
        }
      </div>
        </>
      )}
    </main>
  );
}

export default Cart
