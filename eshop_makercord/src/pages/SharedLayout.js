import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { CartProvider } from "../context/CartContext"
import { ProductProvider } from "../context/ProductContext"
import { UserProvider } from "../context/UserContext"

const SharedLayout = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <Header />
          <Outlet />
          <Footer />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  )
}

export default SharedLayout
