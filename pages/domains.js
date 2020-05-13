import Skawe from '@skawe';
import Router from 'next/router';
import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

class Domains extends Component {
  state = {
    value: '',
  }

  handleSubmit = async e => {
    e.preventDefault();
    Router.push({
      pathname: '/domains/domain-register',
      query: { domainToCheck: this.state.value },
    })
  }

  handleChange = async e => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <Skawe.components.Layout>
        <Skawe.components.HeadTags title="Domains" description="Domains Page" />

        <Jumbotron>
          <Container>
            <Row className="center-xs">
              <Col>
                <div className="hero__wrapper text-dark">
                  <Skawe.components.DomainSearch
                    title="Get a Domain Name"
                    lead="With Privacy Protection and lots more."
                    placeholder="Find your Perfect Domain Name."
                    handleValue={this.state.value}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>

        <Skawe.components.DomainPage />
      </Skawe.components.Layout>
    )
  }
}

export default Domains;
