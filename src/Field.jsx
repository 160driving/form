import React, { Component } from 'react';
import Context from './Context';

class Field extends Component {
  handleChange(value, Form) {
    const { name, normalize, onChange } = this.props;
    const { _internal, ...formApi } = Form;

    if (normalize) {
      value = normalize(value);
    }

    formApi.setField(name, value).then(() => {
      formApi.validateField(name);
      _internal.updateComponent(name);
      onChange && onChange(value, formApi);
    });
  }

  render() {
    const { name, render, normalize, onChange, ...rest } = this.props;
    const Component = render;

    return (
      <Context.Consumer>
        {Form => {
          const { storeComponent } = Form._internal;
          storeComponent(name, this);

          return (
            <Component
              {...rest}
              error={Form.getError(name)}
              name={name}
              value={Form.getField(name)}
              touched={Form.isTouched(name)}
              onChange={value => this.handleChange(value, Form)}
            />
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Field;