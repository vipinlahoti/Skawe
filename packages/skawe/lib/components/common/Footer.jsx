import { getSetting, Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import _sortBy from 'lodash/sortBy';
import { Pages } from '../../modules/pages/index.js';

const logoUrl = getSetting('logoUrl');
const siteTitle = getSetting('title');

const Footer = ({results, totalCount}) => {
  const getPageLists = [];

  for (let i = 0; i < totalCount; i++) {
    const setPageList = {
      id: results[i]['_id'],
      orderBy: results[i]['orderBy'],
      title: results[i]['title'],
      slug: results[i]['slug'],
      pageUrl: results[i]['pageUrl'],
      pagePath: results[i]['pagePath'],
      features: results[i]['features'] && results[i]['features'][0]['name'],
    }

    getPageLists.push(setPageList);
  }

  return (
    <footer className="section-medium">
      <Container>
        <Row className="between-xs">
          <Col md={3} sm={4} xs={4}>
            <h6 className="title-6">Products</h6>
            <Nav className="vertical-nav">

              {getPageLists && _sortBy(getPageLists, ['orderBy']).map(link => 
              <React.Fragment key={link.id}>
                {link.features !== 'Home'
                  && link.features !== 'Company'
                  && link.features !== 'Contact'
                  && link.features !== 'Features'
                  && link.features !== 'null' ?
                  <React.Fragment>
                    <Link to={{ pathname: link.pagePath }} className="nav-link">
                      {link.title}
                    </Link>
                    <br />
                  </React.Fragment>
                : null }
              </React.Fragment>
              )}
            </Nav>
          </Col>

          <Col md={3} sm={4} xs={4}>
            <div className="mb-2">
              <h6 className="title-6">Features</h6>
              <Nav className="vertical-nav">
                {getPageLists && _sortBy(getPageLists, ['orderBy']).map(link => 
                <React.Fragment key={link.id}>
                  {link.features === 'Features' && link.features !== 'null' ?
                    <React.Fragment>
                      <Link to={{ pathname: link.pagePath }} className="nav-link">
                        {link.title}
                      </Link>
                      <br />
                    </React.Fragment>
                  : null }
                </React.Fragment>
                )}
              </Nav>
            </div>
            <div className="mb-2">
              <h6 className="title-6">Resources</h6>
              <Nav className="vertical-nav">
                <Link to={{ pathname: '/docs' }} className="nav-link">
                  Documentation
                </Link>
                <br />
              </Nav>

            </div>
          </Col>

          <Col md={3} sm={4} xs={4}>
            <div className="mb-2">
              <h6 className="title-6">Company</h6>
              <Nav className="vertical-nav">
                <Link to={{ pathname: '/blog' }} className="nav-link">
                  Blog
                </Link>
                <br />
                {getPageLists && _sortBy(getPageLists, ['orderBy']).map(link => 
                <React.Fragment key={link.id}>
                  {link.features === 'Company' && link.features !== 'null' ?
                    <React.Fragment>
                      <Link to={{ pathname: link.pagePath }} className="nav-link">
                        {link.title}
                      </Link>
                      <br />
                    </React.Fragment>
                  : null }
                </React.Fragment>
                )}
              </Nav>
            </div>

            <div className="mb-2">
              <h6 className="title-6">Contact</h6>
              <Nav className="vertical-nav">
                {getPageLists && getPageLists.map(link => 
                <React.Fragment key={link.id}>
                  {link.features === 'Contact' && link.features !== 'null' ?
                    <React.Fragment>
                      <Link to={{ pathname: link.pagePath }} className="nav-link">
                        {link.title}
                      </Link>
                      <br />
                    </React.Fragment>
                  : null }
                </React.Fragment>
                )}
              </Nav>
            </div>
          </Col>

          <Col md={3} sm={6} xs={4}>
            <div className="footer-right">
              <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
              <div className="copyright mt-1">Copyright &copy; 2020 All Rights Reserved.</div>
              <div className="copyright">
                Made in India.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

const options = {
  collection: Pages,
  fragmentName: 'PageItem',
};

registerComponent({ name: 'Footer', component: Footer, hocs: [[withMulti2, options]] });
