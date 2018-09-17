const money = require("money-math");

module.exports = function (sequelize, DataTypes) {
  const Balance = sequelize.define("Balance", {
    cc1: DataTypes.DECIMAL(11, 2),
    cc2: DataTypes.DECIMAL(11, 2),
    cc3: DataTypes.DECIMAL(11, 2),
    cc4: DataTypes.DECIMAL(11, 2),
    cc5: DataTypes.DECIMAL(11, 2),
    cc6: DataTypes.DECIMAL(11, 2),
    savings1: DataTypes.DECIMAL(11, 2),
    savings2: DataTypes.DECIMAL(11, 2),
    savings3: DataTypes.DECIMAL(11, 2),
    checking: DataTypes.DECIMAL(11, 2),
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }

  });

  Balance.associate = function (models) {
    Balance.belongsTo(models.User);
  }

  Balance.prototype.calcBalanceUpdate = function (changeObj) {
    let { checkingCredit, checkingDebit, savings1Credit, savings1Debit, savings2Credit, savings2Debit, savings3Credit, savings3Debit, cc1Credit, cc1Debit, cc2Credit, cc2Debit, cc3Credit, cc3Debit, cc4Credit, cc4Debit, cc5Credit, cc5Debit, cc6Credit, cc6Debit } = changeObj;
    let updateObj = {};

    //  credit and debit are drawn from the destructured object above
    //  objectKey is the name of the field in the database that will be updated
    //  thisThing is the account from the instance, i.e. this.account
    //  This explanation also applies to the ccBalanceUpdate function below.
    const notCcBalanceUpdate = function (credit, debit, objectKey, thisThing) {
      if (parseFloat(credit).toFixed(2) > parseFloat(debit).toFixed(2))
        updateObj[objectKey] = money.add(
          parseFloat(thisThing).toFixed(2).toString(),
          money.subtract(
            parseFloat(credit).toFixed(2).toString(),
            parseFloat(debit).toFixed(2).toString()
          ).toString()
        );
      else if (parseFloat(debit).toFixed(2) > parseFloat(credit).toFixed(2))
        updateObj[objectKey] = money.subtract(
          parseFloat(thisThing).toFixed(2).toString(),
          money.subtract(
            parseFloat(debit).toFixed(2).toString(),
            parseFloat(credit).toFixed(2).toString()
          ).toString()
        );
    }

    notCcBalanceUpdate(checkingCredit, checkingDebit, 'checking', this.checking);
    notCcBalanceUpdate(savings1Credit, savings1Debit, 'savings1', this.savings1);
    notCcBalanceUpdate(savings2Credit, savings2Debit, 'savings2', this.savings2);
    notCcBalanceUpdate(savings3Credit, savings3Debit, 'savings3', this.savings3);

    // A credit (payment) on a cc SUBTRACTS from the total
    //  unlike a checking account, where it would ADD.
    // This is the reverse of how it works for other accounts,
    //  so don't let it confuse you.
    const ccBalanceUpdate = function (credit, debit, objectKey, thisThing) {
      if (parseFloat(credit).toFixed(2) > parseFloat(debit).toFixed(2))
        updateObj[objectKey] = money.subtract(
          parseFloat(thisThing).toFixed(2).toString(),
          money.subtract(
            parseFloat(credit).toFixed(2).toString(),
            parseFloat(debit).toFixed(2).toString()
          ).toString()
        );
      else if (parseFloat(debit).toFixed(2) > parseFloat(credit).toFixed(2))
        updateObj[objectKey] = money.add(
          parseFloat(thisThing).toFixed(2).toString(),
          money.subtract(
            parseFloat(debit).toFixed(2).toString(),
            parseFloat(credit).toFixed(2).toString()
          ).toString()
        )
    }

    ccBalanceUpdate(cc1Credit, cc1Debit, 'cc1', this.cc1);
    ccBalanceUpdate(cc2Credit, cc2Debit, 'cc2', this.cc2);
    ccBalanceUpdate(cc3Credit, cc3Debit, 'cc3', this.cc3);
    ccBalanceUpdate(cc4Credit, cc4Debit, 'cc4', this.cc4);
    ccBalanceUpdate(cc5Credit, cc5Debit, 'cc5', this.cc5);
    ccBalanceUpdate(cc6Credit, cc6Debit, 'cc6', this.cc6);

    return updateObj;
  }

  //  This method is for adjusting account balances if they become off for whatever reason.
  //  This way you can be sloppy about your record-keeping if you just want to keep track
  //   of a few things and let the rest slide. This isn't meant to satisfy any legal requirements.
  Balance.prototype.processBalanceAdjust = function (reqBody) {
    const { category, type, amount } = reqBody;
    let updateObject = {};
    let op;

    //  The front end has the option of either 'Add' or 'Subtract', and the value sent
    //   is a plus sign or a minus sign.
    if (type === "+") op = function (current, adjustment) {
      return money.add(current, adjustment);
    }
    if (type === "-") op = function (current, adjustment) {
      return money.subtract(current, adjustment);
    }

    const adjustFunction = function (thisThing, objectKey, amt) {
      const current = parseFloat(thisThing).toFixed(2).toString();
      const adjustment = parseFloat(amt).toFixed(2).toString();
      updateObject[objectKey] = op(current, adjustment);
    }

    switch (category) {
      case "checking": adjustFunction(this.checking, 'checking', amount); break;
      case "cc1": adjustFunction(this.cc1, 'cc1', amount); break;
      case "cc2": adjustFunction(this.cc2, 'cc2', amount); break;
      case "cc3": adjustFunction(this.cc3, 'cc3', amount); break;
      case "cc4": adjustFunction(this.cc4, 'cc4', amount); break;
      case "cc5": adjustFunction(this.cc5, 'cc5', amount); break;
      case "cc6": adjustFunction(this.cc6, 'cc6', amount); break;
      case "savings1": adjustFunction(this.savings1, 'savings1', amount); break;
      case "savings2": adjustFunction(this.savings2, 'savings2', amount); break;
      case "savings3": adjustFunction(this.savings3, 'savings3', amount); break;
      default: console.log("No category match found.");
    }

    return updateObject;
  }

  Balance.prototype.processDeleteChecking = function (amount, income) {
    let newBalance;
    let checkBalance = parseFloat(this.checking).toFixed(2).toString();
    let formatAmount = parseFloat(amount).toFixed(2).toString();
    if (income) newBalance = money.subtract(checkBalance, formatAmount);
    else newBalance = money.add(checkBalance, formatAmount);
    return newBalance;
  }

  return Balance;
}
