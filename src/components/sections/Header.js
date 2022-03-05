import React from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../helpers/reducers/Theme';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from '../reusables/Drawer';

const Header = (props) => {
    const dispatch = useDispatch()
  
    return (
        <header>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="/">OpenSea</Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="align-items-center">
                            <NavDropdown title="Categories" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/collections">Collections</Link>
                                </NavDropdown.Item>

                                <NavDropdown.Item>                        
                                    <Link to="/nfts">NFTs</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            <Nav.Item>                        
                                <Link to="/collections">Collections</Link>
                            </Nav.Item>
                            
                            <Nav.Item>                        
                                <Link to="/nfts">NFTs</Link>
                            </Nav.Item>
                            
                            <Nav.Item>                        
                                <Link to="/about">About</Link>
                            </Nav.Item>

                            <Button variant="primary" onClick={() => dispatch(setTheme({ color: props.themeColor === 'light' ? 'dark' : 'light' }))}>
                                {props.themeColor}
                            </Button>

                            <Offcanvas />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;