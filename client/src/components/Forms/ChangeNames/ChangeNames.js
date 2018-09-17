import React from "react";
import { Inner, Outer, Textbox } from "../../Elements/Containers";
import { FormBtn, Input } from "../../Elements/Form";
import { API } from "../../../utils";
import "./ChangeNames.css";

class ChangeNames extends React.Component {
  state = {
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
      .then(response => {
        this.setState({
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
        });
        this.props.getAccountNames();
        this.props.setModal({
          body: <h4>Database has been updated.</h4>,
          buttons: <button onClick={this.props.closeModal}>OK</button>
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { checking, shelter, util1, util2, util3, util4, util5, car, insurance, cc1, cc2, cc3, cc4, cc5, cc6, cash, detail1, detail2, detail3, detail4, detail5, other1, other2, other3, savings1, savings2, savings3 } = this.props.accounts;

    // to shorten all the names for disabling the button at the bottom:
    const n = this.state;
    return (
      <div className="names-form-wrapper">
        <Outer addedClass="names-form-container">
          <h2>ACCOUNT NAMES</h2>
          <Inner addedClass="names-form-inner">
            <Textbox addedClass="names-instructions">
              <ul>
                <li>Here, you can change the names of your accounts and other items.</li>
                <li>Each field contains a placeholder - the current name if it has one, and an example if not.</li>
                <li>Changing the name will not change any existing data, except to reassign it to the new name.</li>
                <li>If you don't want to change one, just leave the placeholder.</li>
                <li>You can add new accounts if there are any you have not already used.</li>
                <li>If you no longer want to track an item, enter 'delete' into the field.</li>
                <li><span className="red-text">Warning!: </span>With the exception of certain required items (Checking, Housing, Cash, the first Utility, and the first Savings), deleting an item will <span className="red-text">permanently</span> delete all records. Be sure before you delete!</li>
                <li>Attempting to delete a required item will only result in changing its name to the default name.</li>
                <li>If you wish to delete them anyway and start fresh, perhaps you should setup a new username.</li>
                <li>If you have any questions, suck it up, cupcake; you're on your own.</li>
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
              placeholder={checking ? checking : "ex. 'Checking'"}
            />
            <Input
              value={this.state.shelter}
              onChange={this.handleInputChange}
              name="shelter"
              type="text"
              maxLength="15"
              label="Housing:"
              tooltip="Housing is tracked only as an expense - not tracked in detail."
              placeholder={shelter ? shelter : "ex. 'Mortgage' or 'Rent'"}
            />
            <Input
              value={this.state.util1}
              onChange={this.handleInputChange}
              name="util1"
              type="text"
              maxLength="15"
              label="Utility 1:"
              tooltip="Utilities are tracked only as an expense - not tracked in detail."
              placeholder={util1 ? util1 : "ex. 'Gas Bill'"}
            />
            <Input
              value={this.state.util2}
              onChange={this.handleInputChange}
              name="util2"
              type="text"
              maxLength="15"
              label="Utility 2:"
              placeholder={util2 ? util2 : "ex. 'Electricity'"}
            />
            <Input
              value={this.state.util3}
              onChange={this.handleInputChange}
              name="util3"
              type="text"
              maxLength="15"
              label="Utility 3:"
              placeholder={util3 ? util3 : "ex. 'Cable'"}
            />
            <Input
              value={this.state.util4}
              onChange={this.handleInputChange}
              name="util4"
              type="text"
              maxLength="15"
              label="Utility 4:"
              placeholder={util4 ? util4 : "ex. 'Cell Phone'"}
            />
            <Input
              value={this.state.util5}
              onChange={this.handleInputChange}
              name="util5"
              type="text"
              maxLength="15"
              label="Utility 5:"
              placeholder={util5 ? util5 : "ex. 'Land Line'"}
            />
            <Input
              value={this.state.car}
              onChange={this.handleInputChange}
              name="car"
              type="text"
              maxLength="15"
              label="Car:"
              tooltip="Car expenses are tracked only as an expense - not tracked in detail."
              placeholder={car ? car : "ex. 'Car Payment' or 'Honda'"}
            />
            <Input
              value={this.state.insurance}
              onChange={this.handleInputChange}
              name="insurance"
              type="text"
              maxLength="15"
              label="Insurance:"
              tooltip="Insurance is tracked only as an expense - not tracked in detail."
              placeholder={insurance ? insurance : "ex. 'State Farm' or 'Car Ins.'"}
            />
            <Input
              value={this.state.cc1}
              onChange={this.handleInputChange}
              name="cc1"
              type="text"
              maxLength="15"
              label="Credit Card 1:"
              tooltip="You can list up to six credit cards and keep track of your expenses and payments in detail."
              placeholder={cc1 ? cc1 : "ex. 'AMEX'"}
            />
            <Input
              value={this.state.cc2}
              onChange={this.handleInputChange}
              name="cc2"
              type="text"
              maxLength="15"
              label="Credit Card 2:"
              placeholder={cc2 ? cc2 : "ex. 'Bank CC'"}
            />
            <Input
              value={this.state.cc3}
              onChange={this.handleInputChange}
              name="cc3"
              type="text"
              maxLength="15"
              label="Credit Card 3:"
              placeholder={cc3 ? cc3 : "ex. 'Bank MC'"}
            />
            <Input
              value={this.state.cc4}
              onChange={this.handleInputChange}
              name="cc4"
              type="text"
              maxLength="15"
              label="Credit Card 4:"
              placeholder={cc4 ? cc4 : "ex. 'Bank Visa'"}
            />
            <Input
              value={this.state.cc5}
              onChange={this.handleInputChange}
              name="cc5"
              type="text"
              maxLength="15"
              label="Credit Card 5:"
              placeholder={cc5 ? cc5 : "ex. 'Visa'"}
            />
            <Input
              value={this.state.cc6}
              onChange={this.handleInputChange}
              name="cc6"
              type="text"
              maxLength="15"
              label="Credit Card 6:"
              placeholder={cc6 ? cc6 : "ex. 'Discover'"}
            />
            <Input
              value={this.state.cash}
              onChange={this.handleInputChange}
              name="cash"
              type="text"
              maxLength="15"
              label="Cash:"
              tooltip="Cash is tracked only as an expense - not tracked in detail."
              placeholder={cash ? cash : "ex. 'Cash'"}
            />
            <Input
              value={this.state.detail1}
              onChange={this.handleInputChange}
              name="detail1"
              type="text"
              maxLength="15"
              label="Detail 1:"
              tooltip="You can track up to five gategories of spending. Each will be availble as a category of expense on any credit or checking expenditures - you will be able to track how much you spend on it each month, on average, and overall."
              placeholder={detail1 ? detail1 : "ex. 'Gas'"}
            />
            <Input
              value={this.state.detail2}
              onChange={this.handleInputChange}
              name="detail2"
              type="text"
              maxLength="15"
              label="Detail 2:"
              placeholder={detail2 ? detail2 : "ex. 'Food'"}
            />
            <Input
              value={this.state.detail3}
              onChange={this.handleInputChange}
              name="detail3"
              type="text"
              maxLength="15"
              label="Detail 3:"
              placeholder={detail3 ? detail3 : "ex. 'Clothing'"}
            />
            <Input
              value={this.state.detail4}
              onChange={this.handleInputChange}
              name="detail4"
              type="text"
              maxLength="15"
              label="Detail 4:"
              placeholder={detail4 ? detail4 : "ex. 'Entertainmt"}
            />
            <Input
              value={this.state.detail5}
              onChange={this.handleInputChange}
              name="detail5"
              type="text"
              maxLength="15"
              label="Detail 5:"
              placeholder={detail5 ? detail5 : "ex. 'Business'"}
            />
            <Input
              value={this.state.other1}
              onChange={this.handleInputChange}
              name="other1"
              type="text"
              maxLength="15"
              label="Other 1:"
              tooltip="These are meant to cover expenses missed above, such as other utilities or a second car payment. The 'Other' category cannot be used to track another Credit Card, Savings, Checking, or Detail. It is only for labeling another expense and is not tracked in detail."
              placeholder={other1 ? other1 : "ex. 'Student Loan'"}
            />
            <Input
              value={this.state.other2}
              onChange={this.handleInputChange}
              name="other2"
              type="text"
              maxLength="15"
              label="Other 2:"
              placeholder={other2 ? other2 : "ex. 'Gym'"}
            />
            <Input
              value={this.state.other3}
              onChange={this.handleInputChange}
              name="other3"
              type="text"
              maxLength="15"
              label="Other 3:"
              placeholder={other3 ? other3 : "ex. 'Netflix'"}
            />
            <Input
              value={this.state.savings1}
              onChange={this.handleInputChange}
              name="savings1"
              type="text"
              label="Savings 1:"
              tooltip="You can list up to three savings accounts, but this will only track the balance for you. Details will not be tracked."
              placeholder={savings1 ? savings1 : "ex. 'Savings'"}
            />
            <Input
              value={this.state.savings2}
              onChange={this.handleInputChange}
              name="savings2"
              type="text"
              maxLength="15"
              label="Savings 2:"
              placeholder={savings2 ? savings2 : "ex. 'Money Market'"}
            />
            <Input
              value={this.state.savings3}
              onChange={this.handleInputChange}
              name="savings3"
              type="text"
              maxLength="15"
              label="Savings 3:"
              placeholder={savings3 ? savings3 : "ex. 'Vacation'"}
            />
            <FormBtn
              disabled={
                !n.checking && !n.shelter && !n.util1 && !n.util2 && !n.util3
                && !n.util4 && !n.util5 && !n.car && !n.insurance && !n.cc1 && !n.cc2
                && !n.cc3 && !n.cc4 && !n.cc5 && !n.cc6 && !n.cash && !n.detail1
                && !n.detail2 && !n.detail3 && !n.detail4 && !n.detail5 && !n.other1
                && !n.other2 && !n.other3 && !n.savings1 && !n.savings2 && !n.savings
              }
              onClick={this.handleFormSubmit}
              value="submit"
            />
          </Inner>
        </Outer>
      </div>
    )
  }

};

export default ChangeNames;