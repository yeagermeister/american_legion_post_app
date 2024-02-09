import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { post_number } from '../../utils/vars';
import logo from '../../assets/legion_brand.jpg';
import { AuthContext } from '../../utils/authContext';



const NavUI = () => {
  const { logout, isLoggedIn, setIsLoggedIn, setAdmin} = useContext(AuthContext);
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setIsLoggedIn(false);
    setAdmin(false);
    navigate('/');
  }
  
  const navigate = useNavigate();
console.log('isLoggedIn', isLoggedIn);

  return (
    <>
      <Navbar className="navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <img
              src={logo}
              width='100'
              height='45'
              className='d-inline-block align-top'
              alt='American Legion Logo'
            />{' '}
          </Navbar.Brand>

          <Navbar.Toggle className="whiteButton" aria-controls='navbar' />
            <Navbar.Collapse id='navbar'>
              <Nav>
                  <Nav.Link className='nav-link' as={Link} to='/'>American Legion Post {post_number}</Nav.Link>
                  <Nav.Link className='nav-link' as={Link} to='/calendar'>Calendar </Nav.Link>  
                  <Nav.Link className='nav-link' as={Link} to='/news'>News </Nav.Link>
                    {/* Add a TV link here */}
                  <Nav.Link className='nav-link' as={Link} to='/menu'>Menu </Nav.Link>

                {/* if user is logged in show the gallery and logout options*/}
                {isLoggedIn ? (
                  <>
                  <Nav.Link className='nav-link' as={Link} to='/gallery'>Gallery </Nav.Link>
                  <Link className='nav-link' to="/" onClick={handleLogout}>Logout</Link>
                  </>
                ) : (
                  <Nav.Link className='nav-link' as={Link} to='/login'>Login/Sign Up</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavUI;
