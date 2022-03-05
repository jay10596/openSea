import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../reusables/Icon'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ToogleSwitch from '../reusables/ToogleSwitch';
import Drawer from '../reusables/Drawer';

const Header = (props) => {  
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

                            <Nav.Item>
                                <Icon />
                            </Nav.Item>

                            <ToogleSwitch />

                            <Drawer />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;