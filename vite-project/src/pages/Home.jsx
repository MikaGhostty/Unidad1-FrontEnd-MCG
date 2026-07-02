import { Link } from "react-router-dom"
import { Container, Button } from "react-bootstrap"

function Home() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1>Bienvenido a SportClub</h1>
      <p>Sistema SPA desarrollado con React.</p>
      
      <div className="mt-4">
        <Link to="/login">
          <Button variant="primary" className="me-3">
            Iniciar Sesión
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="success">
            Registrarse
          </Button>
        </Link>
      </div>
    </Container>
  )
}

export default Home
