import Introduction from '../components/Introduction/Introduction';
import ProductsCarousel from '../components/Products/ProductsCarousel';
import "./Home.css"

const Home = () => {
  return <main className="home-page">
      <Introduction />
      <ProductsCarousel />
      <div className="view-all">
        <a href="/products">Zobrazit všechny produkty</a>
      </div>
  </main>
}

export default Home
