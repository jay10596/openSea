import React, { useState } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

function Drawer() {
    // State variables
    const [show, setShow] = useState(false);

    // Bind values
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            <MdOutlineAccountBalanceWallet onClick={handleShow} size="2rem" />

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Drawer;