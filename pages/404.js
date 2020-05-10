import Skawe from '@skawe';
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default () => {
  return (
    <Skawe.components.Layout>
      <Skawe.components.HeadTags title="404" description="Error 404 Page" />
      <div className="section">
        <Container>
          <Row>
            <Col sm={12} md={5} lg={5}>
              <h4 className="display-3">Error 404</h4>
            </Col>

            <Col sm={12} md={7} lg={7}></Col>
          </Row>
        </Container>
      </div>
    </Skawe.components.Layout>
  )
}
