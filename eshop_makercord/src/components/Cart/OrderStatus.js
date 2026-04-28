import "./OrderStatus.css";
import { useCart } from "../../context/CartContext";

const OrderStatus = ({ orderStatus = 1, setOrderStatus }) => {
  const { cart, isDeliveryDetailsComplete } = useCart();
  const steps = [
    { key: 1, label: "Košík" },
    { key: 2, label: "Doprava a platba" },
    { key: 3, label: "Dodací údaje" },
    { key: 4, label: "Souhrn" },
  ];

  return (
    <section className="order-status">
      {steps.map((step, idx) => {
        const stepNumber = step.key;
        const isCompleted = stepNumber < orderStatus;
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
              aria-label={`Krok ${stepNumber}: ${step.label}${isLocked ? " (uzamčeno)" : ""}`}
            >
                <div className={`order-status-step-dot ${isCompleted ? "completed" : ""}`} />
            </button>
            <h4 className="order-status-label">{step.label}</h4>
          </div>
        )
      })}
    </section>
  );
};

export default OrderStatus;
