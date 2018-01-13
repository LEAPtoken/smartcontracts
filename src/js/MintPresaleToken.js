import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import NumberInput from 'grommet/components/NumberInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';

export default class MintPresaleToken extends Component {
  constructor() {
    super();

    this.state = {
      address: '0x123',
      amount: '0'
    };

    this._onChangeAddress = this._onChangeAddress.bind(this);
    this._onChangeAmount = this._onChangeAmount.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChangeAddress(event) {
    this.setState({
      address: event.target.value
    });
  }

  _onChangeAmount(event) {
    this.setState({
      amount: event.target.value
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      address: this.state.address,
      amount: this.state.amount
    });
  }

  render() {
    return (
      <Box align='center'>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label='Address'>
                <TextInput value={this.state.address} onDOMChange={this._onChangeAddress} />
              </FormField>
              <FormField label='Amount'>
                <TextInput value={this.state.amount} onDOMChange={this._onChangeAmount} />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer margin={{ vertical: 'medium' }}>
            <Button type='submit' label='Mint coins' onClick={this._onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
}
