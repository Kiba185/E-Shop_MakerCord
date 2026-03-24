import "./OrderStatus.css";
import { useCart } from "../../context/CartContext";

const OrderStatus = ({ orderStatus = 1, setOrderStatus }) => {
  const { cart, isDeliveryDetailsComplete } = useCart();
  const steps = [
    "Nákupní košík",
    "Doprava a platba",
    "Dodací údaje",
    "Souhrn",
  ];


  return (
    <section className="order-status">
      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = stepNumber <= orderStatus;
        const isActive = stepNumber === orderStatus;
        const isCartEmpty = cart.length === 0;
        const isLockedByCart = isCartEmpty && stepNumber > 1;
        const isLockedByDetails = stepNumber === 4 && !isDeliveryDetailsComplete;
        const isLocked = isLockedByCart || isLockedByDetails;

        return (
          <div key={idx} className="order-status-step">
            <button
              type="button"
              className={`order-status-step-circle ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""} ${isLocked ? "locked" : ""}`}
              onClick={() => {
                if (!isLocked) setOrderStatus(stepNumber);
              }}
              disabled={isLocked}
            >
                <div className={`order-status-step-dot ${isCompleted ? "completed" : ""}`} />
            </button>
            <h4 className="order-status-label">{label}</h4>
            {idx > 0 && <div className="order-status-line" />}
          </div>
        )
      })}
    </section>
  );
};

export default OrderStatus;
