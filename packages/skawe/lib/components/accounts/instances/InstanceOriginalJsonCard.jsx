import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React, { Component } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

class InstanceOriginalJsonCard extends Component { 
  apiDataFn = (setApiData) => {
    return (
      <Row className="mb-2 bg-gray">
        <Col>
          <div className="section-xsmall">
            <Row>
              {setApiData.map((apiDataItem, index) => 
                <Col md={4} key={index}>
                  <ListGroup>
                    <ListGroup.Item className={apiDataItem.deprecated ? 'p-1 d-block disable-block' : 'p-1 d-block'}>
                      <div className="admin-card-description">
                        <pre className="mb-0">
                          {JSON.stringify(apiDataItem, null, 1)}
                        </pre>
                      </div>

                      <Components.NewButton
                        size="small"
                        collection={this.props.collection}
                        label={<FormattedMessage id="forms.add_to_db" />}
                        successCallback={() => {
                          this.props.flash({ id: 'forms.added_message', type: 'success' });
                        }}
                      />

                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    )
  }

  render() {
    const { setApiData, collection, title } = this.props;

    return (
      <div className="section-distributions">
        {title ? <h6 className="title-6 mb-1">Choost a {title}</h6> : null }
        
        { this.apiDataFn(setApiData) }
      </div>
    )
  }
}

registerComponent({ name: 'InstanceOriginalJsonCard', component: InstanceOriginalJsonCard, hocs: [withMessages] });
