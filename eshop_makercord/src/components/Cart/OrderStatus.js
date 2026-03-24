import "./OrderStatus.css";

const OrderStatus = ({ orderStatus = 1, setOrderStatus }) => {
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

        return (
          <div key={idx} className="order-status-step">
            <button
              type="button"
              className={`order-status-step-circle ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
              onClick={() => setOrderStatus(stepNumber)}
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
