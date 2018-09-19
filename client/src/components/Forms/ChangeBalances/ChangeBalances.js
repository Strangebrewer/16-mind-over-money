import React from "react";
import Currency from "react-currency-formatter";
import { API } from "../../../utils";
import { Inner, Outer, Textbox } from "../../Elements/Containers";
import { FormBtn, Input, Option, Select } from "../../Elements/Form";
import "./ChangeBalances.css";

class ChangeBalances extends React.Component {
  state = {
    category: "",
    type: "",
    amount: ""
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = () => {
    API.changeBalances(this.state)
      .then(res => {
        this.setState({ amount: "" })
        this.props.getAccountNames();
        this.props.setModal({
          body: <h4>Database has been updated.</h4>,
          buttons: <button onClick={this.props.closeModal}>OK</button>
        })
      })
  }

  render() {
    const { accounts, balances } = this.props;
    return (
      <Outer addedClass="balance-change-container">
        <h2>ADJUST BALANCES</h2>
        <Inner addedClass="balance-change-inner">
          <Textbox addedClass="balance-change-data">
            {Object.keys(accounts).map((key, index) => (
              balances[key] !== undefined
                ? (
                  <h4 key={`${key}-${index}`}>{accounts[key]}:
                      <span>
                      <Currency quantity={parseFloat(balances[key])} />
                    </span>
                  </h4>
                ) : null
            ))}
          </Textbox>

          <Select name="category" onChange={this.handleInputChange}>
            <Option>Select an account</Option>
            {Object.keys(accounts).map((key, index) => (
              balances[key] !== undefined
                ? <Option key={`${key}-${index}`} value={`${key}`}>{accounts[key]}</Option>
                : null
            ))}
          </Select>

          <Select name="type" onChange={this.handleInputChange}>
            <Option>Select operation</Option>
            <Option value="+">Add</Option>
            <Option value="-">Subtract</Option>
          </Select>

          <Input
            value={this.state.amount}
            name="amount"
            onChange={this.handleInputChange}
            placeholder="Amount, e.g. '55.07'"
          />

          <FormBtn
            disabled={
              !this.state.category
              || !this.state.type
              || !this.state.amount
            }
            onClick={this.handleFormSubmit}
            value="submit"
          />

        </Inner>
      </Outer>
    )
  }
};

export default ChangeBalances;