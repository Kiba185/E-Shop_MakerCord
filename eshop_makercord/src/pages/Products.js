import ProductsOverview from '../components/Products/ProductsOverview';
import PageHeading from '../components/PageHeading';

const Products = () => {
  return <main className="products-page">
    <PageHeading>Produkty</PageHeading>
    <ProductsOverview />
  </main>
} 

export default Products