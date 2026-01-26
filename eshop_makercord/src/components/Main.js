import "./Main.css";
import Introduction from "./Introduction";

const Main = () => {
  return (
    <main>
      <Introduction />
      <div className="products-overview">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-item">
            <h3>MakerCord Basic Kit</h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;