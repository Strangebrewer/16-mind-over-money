import React from "react";
import { Inner, Outer, Textbox } from "../../Elements/Containers";
import { FormBtn, Input } from "../../Elements/Form";
import { API } from "../../../utils";
import { FastFade } from "../../Fade";
import "./InitialNames.css";

class InitialNames extends React.Component {
  state = {
    style: {
      nameStyle: {}
    },
    checking: "",
    shelter: "",
    util1: "",
    util2: "",
    util3: "",
    util4: "",
    util5: "",
    car: "",
    insurance: "",
    cc1: "",
    cc2: "",
    cc3: "",
    cc4: "",
    cc5: "",
    cc6: "",
    cash: "",
    detail1: "",
    detail2: "",
    detail3: "",
    detail4: "",
    detail5: "",
    other1: "",
    other2: "",
    other3: "",
    savings1: "",
    savings2: "",
    savings3: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = () => {
    const { checking, shelter, util1, util2, util3, util4, util5, car, insurance, cc1, cc2, cc3, cc4, cc5, cc6, cash, detail1, detail2, detail3, detail4, detail5, other1, other2, other3, savings1, savings2, savings3 } = this.state;

    const nameObject = { setup_names: true }
    if (checking) nameObject.checking = checking;
    if (shelter) nameObject.shelter = shelter;
    if (util1) nameObject.util1 = util1;
    if (util2) nameObject.util2 = util2;
    if (util3) nameObject.util3 = util3;
    if (util4) nameObject.util4 = util4;
    if (util5) nameObject.util5 = util5;
    if (car) nameObject.car = car;
    if (insurance) nameObject.insurance = insurance;
    if (cc1) nameObject.cc1 = cc1;
    if (cc2) nameObject.cc2 = cc2;
    if (cc3) nameObject.cc3 = cc3;
    if (cc4) nameObject.cc4 = cc4;
    if (cc5) nameObject.cc5 = cc5;
    if (cc6) nameObject.cc6 = cc6;
    if (cash) nameObject.cash = cash;
    if (detail1) nameObject.detail1 = detail1;
    if (detail2) nameObject.detail2 = detail2;
    if (detail3) nameObject.detail3 = detail3;
    if (detail4) nameObject.detail4 = detail4;
    if (detail5) nameObject.detail5 = detail5;
    if (other1) nameObject.other1 = other1;
    if (other2) nameObject.other2 = other2;
    if (other3) nameObject.other3 = other3;
    if (savings1) nameObject.savings1 = savings1;
    if (savings2) nameObject.savings2 = savings2;
    if (savings3) nameObject.savings3 = savings3;

    API.setAccountNames(nameObject)
      .then(() => {
        this.setState({
          style: {
            nameStyle: {
              opacity: '0',
              transition: 'opacity .5s ease-in-out'
            }
          }
        });
        setTimeout(() => {
          this.props.updateUser({
            auth: true,
            state: { setupNames: true }
          })
        }, 510)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <FastFade array={[
        <div className="initial-names-wrapper">
          <Outer addedClass="initial-names-container" style={this.state.style.nameStyle}>
            <h2>ACCOUNT NAMES</h2>
            <Inner addedClass="initial-names-inner">
              <Textbox addedClass="initial-names-instructions">
                <ul>
                  <li>Give names to all the accounts and expenses you want to keep track of.</li>
                  <li>If you don't want to use one, just leave it blank.</li>
                  <li>A few of these are required, but if you don't give them names, default names will be assigned.</li>
                  <li>You can come back and change the names later.</li>
                  <li>Hover over the labels to get more info.</li>
                </ul>
              </Textbox>
              <Input
                value={this.state.checking}
                onChange={this.handleInputChange}
                name="checking"
                type="text"
                maxLength="15"
                label="Checking Account:"
                tooltip="This is where most transactions will be drawn from. Tracked in detail."
                placeholder="ex. 'Checking'"
              />
              <Input
                value={this.state.shelter}
                onChange={this.handleInputChange}
                name="shelter"
                type="text"
                maxLength="15"
                label="Housing:"
                tooltip="Housing is tracked only as an expense - not tracked in detail."
                placeholder="ex. 'Mortgage' or 'Rent'"
              />
              <Input
                value={this.state.util1}
                onChange={this.handleInputChange}
                name="util1"
                type="text"
                maxLength="15"
                label="Utility 1:"
                tooltip="Utilities are tracked only as an expense - not tracked in detail."
                placeholder="ex. 'Gas Bill'"
              />
              <Input
                value={this.state.util2}
                onChange={this.handleInputChange}
                name="util2"
                type="text"
                maxLength="15"
                label="Utility 2:"
                placeholder="ex. 'Electricity'"
              />
              <Input
                value={this.state.util3}
                onChange={this.handleInputChange}
                name="util3"
                type="text"
                maxLength="15"
                label="Utility 3:"
                placeholder="ex. 'Cable'"
              />
              <Input
                value={this.state.util4}
                onChange={this.handleInputChange}
                name="util4"
                type="text"
                maxLength="15"
                label="Utility 4:"
                placeholder="ex. 'Cell Phone'"
              />
              <Input
                value={this.state.util5}
                onChange={this.handleInputChange}
                name="util5"
                type="text"
                maxLength="15"
                label="Utility 5:"
                placeholder="ex. 'Land Line'"
              />
              <Input
                value={this.state.car}
                onChange={this.handleInputChange}
                name="car"
                type="text"
                maxLength="15"
                label="Car:"
                tooltip="Car expenses are tracked only as an expense - not tracked in detail."
                placeholder="ex. 'Car Payment' or 'Honda'"
              />
              <Input
                value={this.state.insurance}
                onChange={this.handleInputChange}
                name="insurance"
                type="text"
                maxLength="15"
                label="Insurance:"
                tooltip="Insurance is tracked only as an expense - not tracked in detail."
                placeholder="ex. 'State Farm' or 'Car Ins.'"
              />
              <Input
                value={this.state.cc1}
                onChange={this.handleInputChange}
                name="cc1"
                type="text"
                maxLength="15"
                label="Credit Card 1:"
                tooltip="You can list up to six credit cards and keep track of your expenses and payments in detail."
                placeholder="ex. 'AMEX'"
              />
              <Input
                value={this.state.cc2}
                onChange={this.handleInputChange}
                name="cc2"
                type="text"
                maxLength="15"
                label="Credit Card 2:"
                placeholder="ex. 'Bank CC'"
              />
              <Input
                value={this.state.cc3}
                onChange={this.handleInputChange}
                name="cc3"
                type="text"
                maxLength="15"
                label="Credit Card 3:"
                placeholder="ex. 'Bank MC'"
              />
              <Input
                value={this.state.cc4}
                onChange={this.handleInputChange}
                name="cc4"
                type="text"
                maxLength="15"
                label="Credit Card 4:"
                placeholder="ex. 'Bank Visa'"
              />
              <Input
                value={this.state.cc5}
                onChange={this.handleInputChange}
                name="cc5"
                type="text"
                maxLength="15"
                label="Credit Card 5:"
                placeholder="ex. 'Visa'"
              />
              <Input
                value={this.state.cc6}
                onChange={this.handleInputChange}
                name="cc6"
                type="text"
                maxLength="15"
                label="Credit Card 6:"
                placeholder="ex. 'Discover'"
              />
              <Input
                value={this.state.cash}
                onChange={this.handleInputChange}
                name="cash"
                type="text"
                maxLength="15"
                label="Cash:"
                tooltip="Cash is tracked only as an expense - not tracked in detail."
                placeholder="ex. 'Cash'"
              />
              <Input
                value={this.state.detail1}
                onChange={this.handleInputChange}
                name="detail1"
                type="text"
                maxLength="15"
                label="Detail 1:"
                tooltip="You can track up to five gategories of spending. Each will be availble as a category of expense on any credit or checking expenditures - you will be able to track how much you spend on it each month, on average, and overall."
                placeholder="ex. 'Gas'"
              />
              <Input
                value={this.state.detail2}
                onChange={this.handleInputChange}
                name="detail2"
                type="text"
                maxLength="15"
                label="Detail 2:"
                placeholder="ex. 'Food'"
              />
              <Input
                value={this.state.detail3}
                onChange={this.handleInputChange}
                name="detail3"
                type="text"
                maxLength="15"
                label="Detail 3:"
                placeholder="ex. 'Clothing'"
              />
              <Input
                value={this.state.detail4}
                onChange={this.handleInputChange}
                name="detail4"
                type="text"
                maxLength="15"
                label="Detail 4:"
                placeholder="ex. 'Entertainment"
              />
              <Input
                value={this.state.detail5}
                onChange={this.handleInputChange}
                name="detail5"
                type="text"
                maxLength="15"
                label="Detail 5:"
                placeholder="ex. 'Business'"
              />
              <Input
                value={this.state.other1}
                onChange={this.handleInputChange}
                name="other1"
                type="text"
                maxLength="15"
                label="Other 1:"
                tooltip="These are meant to cover expenses missed above, such as other utilities or a second car payment. The 'Other' category cannot be used to track another Credit Card, Savings, Checking, or Detail. It is only for labeling another expense and is not tracked in detail."
                placeholder="ex. 'Student Loans'"
              />
              <Input
                value={this.state.other2}
                onChange={this.handleInputChange}
                name="other2"
                type="text"
                maxLength="15"
                label="Other 2:"
                placeholder="ex. 'Gym'"
              />
              <Input
                value={this.state.other3}
                onChange={this.handleInputChange}
                name="other3"
                type="text"
                maxLength="15"
                label="Other 3:"
                placeholder="ex. 'Netflix'"
              />
              <Input
                value={this.state.savings1}
                onChange={this.handleInputChange}
                name="savings1"
                type="text"
                label="Savings 1:"
                tooltip="You can list up to three savings accounts, but this will only track the balance for you. Details will not be tracked."
                placeholder="ex. 'Savings'"
              />
              <Input
                value={this.state.savings2}
                onChange={this.handleInputChange}
                name="savings2"
                type="text"
                maxLength="15"
                label="Savings 2:"
                placeholder="ex. 'Money Market'"
              />
              <Input
                value={this.state.savings3}
                onChange={this.handleInputChange}
                name="savings3"
                type="text"
                maxLength="15"
                label="Savings 3:"
                placeholder="ex. 'Vacation'"
              />
              <FormBtn onClick={this.handleFormSubmit} value="submit" />
            </Inner>
          </Outer>
        </div>
      ]} />
    )
  }
};

export default InitialNames;