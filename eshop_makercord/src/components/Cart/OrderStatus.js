import "./OrderStatus.css";

const OrderStatus = ({ orderStatus = 1 }) => {
  const steps = [
    "Nákupní košík",
    "Doprava a platba",
    "Dodací údaje",
    "Souhrn",
  ];

  return (
    <section className="order-status">
      {steps.map((label, idx) => {
        const isCompleted = idx + 1 <= orderStatus;
        return (
          <div key={idx} className="order-status-step">
            <div className={`order-status-step-circle ${isCompleted ? "completed" : ""}`}>
                <div className={`order-status-step-dot ${isCompleted ? "completed" : ""}`} />
            </div>
            <h4 className="order-status-label">{label}</h4>
            {idx > 0 && <div className="order-status-line" />}
          </div>
        );
      })}
    </section>
  );
};

export default OrderStatus;