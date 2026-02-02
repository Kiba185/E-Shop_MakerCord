import "./PageHeading.css"

const PageHeading = ({children}) => {
  return <section className="page-heading">
    <h2>{children}</h2>
  </section>
}

export default PageHeading
