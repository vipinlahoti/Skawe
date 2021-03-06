import React from 'react';
import Form from 'react-bootstrap/Form';
import { Components, registerComponent } from 'meteor/vulcan:core';

const TextareaComponent = ({ refFunction, inputProperties = {}, itemProperties = {}, layout }) => (
  <Components.FormItem path={inputProperties.path} layout={layout} label={inputProperties.label} {...itemProperties}>
    <Form.Control as="textarea" ref={refFunction} {...inputProperties} />
  </Components.FormItem>
);

registerComponent('FormComponentTextarea', TextareaComponent);
