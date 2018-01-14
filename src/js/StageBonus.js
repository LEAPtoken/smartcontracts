import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';

export default class StageBonus extends Component {
  constructor() {
    super();

    this.state = {
      result: '0',
      amount: '0',
      raised: '0'
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onChangeAmount = this._onChangeAmount.bind(this);
    this._onChangeRaised = this._onChangeRaised.bind(this);
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.calculate({
      amount: this.state.amount,
      raised: this.state.raised
    }).then((result) => {
      this.setState({
        result
      });
    });
  }

  _onChangeAmount(event) {
    this.setState({
      amount: event.target.value
    });
  }

  _onChangeRaised(event) {
    this.setState({
      raised: event.target.value
    });
  }

  render() {
    return (
      <Box align='center'>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <Header><Heading>Stage bonus: {this.state.result}</Heading></Header>
            <fieldset>
              <FormField label='Wei Amount'>
                <TextInput value={this.state.amount} onDOMChange={this._onChangeAmount} />
              </FormField>
              <FormField label='Wei Raised'>
                <TextInput value={this.state.raised} onDOMChange={this._onChangeRaised} />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer margin={{ vertical: 'medium' }}>
            <Button type='submit' label='Calculate stage bonus' onClick={this._onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
}
