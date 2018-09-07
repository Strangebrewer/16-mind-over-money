const money = require("money-math");

module.exports = function (sequelize, DataTypes) {
  const Expenses = sequelize.define("Expenses", {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2018

    },
    month: {
      type: DataTypes.ENUM('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
      allowNull: false
    },
    shelter: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    util1: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    util2: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    util3: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    util4: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    util5: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    car: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    insurance: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    cc1: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    cc2: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    cc3: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    cc4: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    cc5: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    cc6: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    cash: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    other1: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    other2: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    other3: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    savings1: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    savings2: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    savings3: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 0.00
    },
    note: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }

  });

  Expenses.associate = function (models) {
    Expenses.belongsTo(models.User);
  }

  Expenses.suckaFish = function () {
    console.log("Suckafish!");
  }

  //  If an expense has already been recorded for the month
  //  The three methods below recalc the changes
  //  In order to update the balances table correctly
  Expenses.calcCheckingDiff = function (req, exp) {
    let credit = "0.00";
    let debit = "0.00";

    //  All the 'toFixed(2).toString()' here is to satisfy the money-math package
    //  which requires numbers be strings in a '0.00' format.
    const expenseFunction = function (expThing, reqThing) {
      const exists = parseFloat(expThing).toFixed(2).toString();
      const change = parseFloat(reqThing).toFixed(2).toString();
      if (expThing === '0.00') debit = money.add(debit, change);
      else if (exists > change)
        credit = money.add(credit, money.subtract(exists, change).toString())
      else
        debit = money.add(debit, money.subtract(change, exists).toString());
    }

    if (req.shelter) expenseFunction(exp.shelter, req.shelter);
    if (req.util1) expenseFunction(exp.util1, req.util1);
    if (req.util2) expenseFunction(exp.util2, req.util2);
    if (req.util3) expenseFunction(exp.util3, req.util3);
    if (req.util4) expenseFunction(exp.util4, req.util4);
    if (req.util5) expenseFunction(exp.util5, req.util5);
    if (req.car) expenseFunction(exp.car, req.car);
    if (req.insurance) expenseFunction(exp.insurance, req.insurance);
    if (req.cc1) expenseFunction(exp.cc1, req.cc1);
    if (req.cc2) expenseFunction(exp.cc2, req.cc2);
    if (req.cc3) expenseFunction(exp.cc3, req.cc3);
    if (req.cc4) expenseFunction(exp.cc4, req.cc4);
    if (req.cc5) expenseFunction(exp.cc5, req.cc5);
    if (req.cc6) expenseFunction(exp.cc6, req.cc6);
    if (req.other1) expenseFunction(exp.other1, req.other1);
    if (req.other2) expenseFunction(exp.other2, req.other2);
    if (req.other3) expenseFunction(exp.other3, req.other3);
    if (req.savings1) expenseFunction(exp.savings1, req.savings1);
    if (req.savings2) expenseFunction(exp.savings2, req.savings2);
    if (req.savings3) expenseFunction(exp.savings3, req.savings3)

    return checkingObj = {
      checkingCredit: credit,
      checkingDebit: debit
    }
  }

  Expenses.calcSavingsDiff = function (req, exp) {
    let savingsObject = {
      oneCredit: "0.00",
      oneDebit: "0.00",
      twoCredit: "0.00",
      twoDebit: "0.00",
      threeCredit: "0.00",
      threeDebit: "0.00",
    }

    const calcSavings = function (expThing, reqThing, credit, debit) {
      const exists = parseFloat(expThing).toFixed(2).toString();
      const change = parseFloat(reqThing).toFixed(2).toString();
      if (expThing === '0.00') savingsObject[credit] = money.add(savingsObject[credit], change)
      else if (exists > change)
      savingsObject[debit] = money.add(savingsObject[debit], money.subtract(exists, change).toString());
      else
      savingsObject[credit] = money.add(savingsObject[credit], money.subtract(change, exists).toString());
    }

    if (req.savings1) calcSavings(exp.savings1, req.savings1, 'oneCredit', 'oneDebit');
    if (req.savings2) calcSavings(exp.savings2, req.savings2, 'twoCredit', 'twoDebit');
    if (req.savings3) calcSavings(exp.savings3, req.savings3, 'threeCredit', 'threeDebit');

    return savingsObj = {
      savings1Credit: savingsObject.oneCredit,
      savings1Debit: savingsObject.oneDebit,
      savings2Credit: savingsObject.twoCredit,
      savings2Debit: savingsObject.twoDebit,
      savings3Credit: savingsObject.threeCredit,
      savings3Debit: savingsObject.threeDebit
    }
  }

  Expenses.calcCreditDiff = function (req, exp) {
    let creditObject = {
      oneCredit: "0.00",
      oneDebit: "0.00",
      twoCredit: "0.00",
      twoDebit: "0.00",
      threeCredit: "0.00",
      threeDebit: "0.00",
      fourCredit: "0.00",
      fourDebit: "0.00",
      fiveCredit: "0.00",
      fiveDebit: "0.00",
      sixCredit: "0.00",
      sixDebit: "0.00"
    }

    // CCs are calculated differently than checking in that
    // credits make the balance go down rather than up.
    // So the math is flipped.
    const calcCredit = function (expThing, reqThing, credit, debit) {
      const exists = parseFloat(expThing).toFixed(2).toString();
      const change = parseFloat(reqThing).toFixed(2).toString();
      if (expThing === '0.00') creditObject[credit] = money.add(creditObject[credit], change);
      else if (exists > change)
        creditObject[debit] = money.add(creditObject[debit], money.subtract(exists, change).toString());
      else
        creditObject[credit] = money.add(creditObject[credit], money.subtract(change, exists).toString());
    }

    if (req.cc1) calcCredit(exp.cc1, req.cc1, 'oneCredit', 'oneDebit');
    if (req.cc2) calcCredit(exp.cc2, req.cc2, 'twoCredit', 'twoDebit');
    if (req.cc3) calcCredit(exp.cc3, req.cc3, 'threeCredit', 'threeDebit');
    if (req.cc4) calcCredit(exp.cc4, req.cc4, 'fourCredit', 'fourDebit');
    if (req.cc5) calcCredit(exp.cc5, req.cc5, 'fiveCredit', 'fiveDebit');
    if (req.cc6) calcCredit(exp.cc6, req.cc6, 'sixCredit', 'sixDebit');
    
    return creditObj = {
      cc1Credit: creditObject.oneCredit,
      cc1Debit: creditObject.oneDebit,
      cc2Credit: creditObject.twoCredit,
      cc2Debit: creditObject.twoDebit,
      cc3Credit: creditObject.threeCredit,
      cc3Debit: creditObject.threeDebit,
      cc4Credit: creditObject.fourCredit,
      cc4Debit: creditObject.fourDebit,
      cc5Credit: creditObject.fiveCredit,
      cc5Debit: creditObject.fiveDebit,
      cc6Credit: creditObject.sixCredit,
      cc6Debit: creditObject.sixDebit,
    }
  }

  return Expenses;
}