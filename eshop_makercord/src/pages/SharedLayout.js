import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { CartProvider } from "../context/CartContext"
import { UserProvider } from "../context/UserContext"

const SharedLayout = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </UserProvider>
  )
}

export default SharedLayout
