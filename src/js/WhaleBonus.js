import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';

export default class WhaleBonus extends Component {
  constructor() {
    super();

    this.state = {
      amount: '0.00',
      result: '0'
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onChangeAmount = this._onChangeAmount.bind(this);
  }

  _onSubmit(event) {
    event.preventDefault();

    const amount = this.props.convertInput(this.state.amount, 'ether');
    this.props.calculate({ amount }).then((result) => {
      const bonusFormatted = this.props.convertResult(result);
      this.setState({
        result: bonusFormatted
      });
    });
  }

  _onChangeAmount(event) {
    this.setState({
      amount: event.target.value
    });
  }

  render() {
    return (
      <Box align='center'>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <Header><Heading tag='h2'>Whale bonus: {this.state.result} LEAP</Heading></Header>
            <fieldset>
              <FormField label='Payment amount (ETH)'>
                <TextInput value={this.state.amount} onDOMChange={this._onChangeAmount} />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer margin={{ vertical: 'medium' }}>
            <Button type='submit' label='Calculate whale bonus' onClick={this._onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
}
