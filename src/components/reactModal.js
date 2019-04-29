import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class MydModalWithGrid extends React.Component {
  state={
    playerName:""
  }
    render() {
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Enter your Name and Play !!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col xs={12} md={8}>
                   <input type="text" name="PlayerName" value={this.state.playerName}/>
                   <Button className="default">Play</Button>
                </Col> 
              </Row> 
              </Container>
          </Modal.Body> 
        </Modal>
      );
    }
  }
  
  export default MydModalWithGrid;