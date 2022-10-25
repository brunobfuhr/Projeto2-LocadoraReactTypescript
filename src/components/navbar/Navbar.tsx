import { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import { AuthContext } from "../../contexts/AuthContext";
import { User } from "phosphor-react";


function CollapsibleExample() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Locadora CrieCars</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Veículos</Nav.Link>
            <Nav.Link href="#pricing"></Nav.Link>
            <NavDropdown title="Cadastros" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Usuarios</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Clientes
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Veículos</NavDropdown.Item>
              <NavDropdown.Item href="#">Marcas</NavDropdown.Item>
              <NavDropdown.Item href="#">Estados</NavDropdown.Item>
              <NavDropdown.Item href="#">Cidades</NavDropdown.Item>
              <NavDropdown.Item href="#"></NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link> {user?.name} 
          <User size={20} />
          </Nav.Link>
          <Nav.Link onClick={logout}>Sair</Nav.Link>
            {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;






// function ColorSchemesExample() {
//   const { logout } = useContext(AuthContext);
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">Home</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Users</Nav.Link>
//             <Nav.Link href="#features">States</Nav.Link>
//             <Nav.Link href="#pricing">Cities</Nav.Link>
//             <Nav.Link href="#pricing">Brands</Nav.Link>
//             <Nav.Link href="#pricing">Vehicles</Nav.Link>
//             <Nav.Link onClick={logout}>Sign out</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
      
      
//     </>
//   );
// }

// export default ColorSchemesExample;