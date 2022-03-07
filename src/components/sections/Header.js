import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import Icon from "../reusables/Icon"
import ToogleSwitch from "../reusables/ToogleSwitch";
import Drawer from "../reusables/Drawer";

function Header() {
    return (
        <header>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/">OpenSea</Navbar.Brand>

                    <Nav className="justify-content-end align-items-center">
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

                        <Nav.Item>
                            <ToogleSwitch />
                        </Nav.Item>

                        <Nav.Item>
                            <Drawer />
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;