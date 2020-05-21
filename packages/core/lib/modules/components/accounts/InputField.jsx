import Skawe from 'meteor/skawe:lib';
import React from 'react';
import Form from 'react-bootstrap/Form';

const InputField = props => {
  const {
    _id,
    type,
    displayName,
    placeholder,
    onChange,
    focusInput,
    defaults,
    error
  } = props

  return (
    <Form.Group>
      {defaults.showLabels && <Form.Label>{displayName}</Form.Label>}
      <Form.Control
        type={type}
        onChange={(e) => onChange(e, _id)}
        placeholder={defaults.showPlaceholders ? placeholder : ''}
        autoFocus={focusInput}
      />
      {error && <small className="text-danger">{error.errStr}</small>}
    </Form.Group>
  )
}

Skawe.registerComponent('InputField', InputField);
