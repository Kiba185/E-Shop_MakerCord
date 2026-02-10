import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { CartProvider } from "../context/CartContext"

const SharedLayout = () => {
  return (
    <CartProvider>
      <Header />
      <Outlet />
      <Footer />
    </CartProvider>
  )
}

export default SharedLayout
