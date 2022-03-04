import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../helpers/reducers/Theme'
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Header = (props) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <header>
            {props.account}
            <Link to="/collections">collections</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>

            <button onClick={() => dispatch(setTheme({ color: props.themeColor === 'light' ? 'dark' : 'light' }))}>
                {props.themeColor}
            </button>

            <Nav className="justify-content-between" activeKey="/home">
                <Nav.Item>
                <Link to="/collections">collections</Link>
                </Nav.Item>
                <Nav.Item>
                <Link to="/products">Products</Link>
                </Nav.Item>
                <Nav.Item>
                <Link to="/about">About</Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>

                <Button variant="primary" onClick={handleShow}>
                    Launch
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>

            </Nav>
        </header>
    );
}

export default Header;