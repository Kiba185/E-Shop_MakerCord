import "./PageHeading.css"
import { Outlet } from "react-router-dom"

const PageHeading = ({children}) => {
  return <section className="page-heading">
    <h2>{children}</h2>
  </section>
}

export default PageHeading
