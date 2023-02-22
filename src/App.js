import React, { Component } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalhandleShow, ModalhandleClose, handleCheckboxChange, handleCheckAllCheckbox, handleDeleteData, handlePageChange } from './components'
import { faCalendarDays, faCircleUser, faEye, faGripVertical } from '@fortawesome/free-solid-svg-icons'

import data from './data'; //DUMMY DATA

export default class App extends Component {
    state = {
        listitems: data.map((item) => ({
            id: item.id,
            author: item.author,
            title: item.title,
            content: item.content,
            date: item.date,
            contentModalDisplayed: false,
            inputChecked: false,
            checkAllCheckbox: false,
        })),
        currentPage: 1,
        pageItems: 10
    };


    render() {

        const { listitems, currentPage, pageItems } = this.state;
        const indexOfLastItem = currentPage * pageItems;
        const indexOfFirstItem = indexOfLastItem - pageItems;
        const currentItems = listitems.slice(indexOfFirstItem, indexOfLastItem);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(listitems.length / pageItems); i++) {
            pageNumbers.push(i);
        }

        return (
            <React.Fragment>
                <div className="container-body">
                    <h4 className="heading">News Articles</h4>
                    <div className="button-container">
                        <div className="button-list">
                            <input type="checkbox" checked={this.state.checkAllCheckbox} onChange={handleCheckAllCheckbox.bind(this)} ></input>
                            <button className="button-publish">Publish</button>
                            <button className="button-delete" onClick={handleDeleteData.bind(this)}>Delete</button>
                        </div>
                        <div className="search-container">
                            <input
                                className="search-input"
                                type="search"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                    <div className="list-value d-flex justify-content-end">
                        <span>{listitems.length}</span>
                    </div>
                    {currentItems.length > 0 ? (
                        currentItems.map((listitem) => (
                            <div key={listitem.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <Col xs={12} md={8}>
                                                    <div className="content-wrapper">
                                                        <div className="content-checkbox me-2">
                                                            <FontAwesomeIcon className="checkbox-icon" icon={faGripVertical} color="#434242" />
                                                            <input type="checkbox" checked={listitem.checked}
                                                                onChange={() => handleCheckboxChange.call(this, listitem.id)}>
                                                            </input>
                                                        </div>
                                                        <div className="content-body">
                                                            <h6 className="item-title">{listitem.title}</h6>
                                                            <div className="list-content">
                                                                <div className="list-subcontent">
                                                                    <FontAwesomeIcon className="user-icon text-success" icon={faCircleUser} />
                                                                    <span className="item-author">{listitem.author}</span>
                                                                </div>
                                                                <div className="list-subcontent">
                                                                    <FontAwesomeIcon className="user-icon text-success" icon={faCalendarDays} />
                                                                    <span className="item-date">{listitem.date}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="item-content">{listitem.content.substring(0, 80) + "..."}</span>
                                                                <span onClick={() => ModalhandleShow.call(this, listitem.id)}>
                                                                    <label className="user-read-icon text-primary">
                                                                        <FontAwesomeIcon icon={faEye} className="text-primary ms-2"></FontAwesomeIcon>
                                                                        Read Full
                                                                    </label>
                                                                </span>
                                                            </div>

                                                            <Modal show={listitem.contentModalDisplayed} onHide={() => ModalhandleClose.call(this, listitem.id)}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>
                                                                        <div className="modal-body-title">
                                                                            {listitem.title}
                                                                        </div></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <div className="modal-body-author">
                                                                        {listitem.author}{" | "}{listitem.date}
                                                                    </div>
                                                                    <div className="modal-body-content">
                                                                        {listitem.content}
                                                                    </div>
                                                                    <Modal.Footer className="justify-content-center">
                                                                        <Button variant="primary"> Publish </Button>
                                                                        <Button variant="danger"> Delete </Button>
                                                                    </Modal.Footer>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col>
                                                    <div className="button-list">
                                                        <button className="list-content-button">#Sports</button>
                                                        <button className="list-content-button">#WorldWide</button>
                                                        <button className="list-content-button">#Local</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div>
                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        <p>No Items to display</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )}

                    <Pagination>
                        {pageNumbers.map((number) => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => handlePageChange.call(this, number)}>
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </React.Fragment >
        )
    }
}
