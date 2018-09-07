import Money from "money-math";

export const Helpers = {

  processAccountNames: function (data) {
    const { checking, shelter, util1, util2, util3, util4, util5, car, insurance, cc1, cc2, cc3, cc4, cc5, cc6, cash, detail1, detail2, detail3, detail4, detail5, other1, other2, other3, savings1, savings2, savings3 } = data;
    let accounts = {};
    if (checking) accounts.checking = checking;
    if (shelter) accounts.shelter = shelter;
    if (util1) accounts.util1 = util1;
    if (util2) accounts.util2 = util2;
    if (util3) accounts.util3 = util3;
    if (util4) accounts.util4 = util4;
    if (util5) accounts.util5 = util5;
    if (car) accounts.car = car;
    if (insurance) accounts.insurance = insurance;
    if (cc1) accounts.cc1 = cc1;
    if (cc2) accounts.cc2 = cc2;
    if (cc3) accounts.cc3 = cc3;
    if (cc4) accounts.cc4 = cc4;
    if (cc5) accounts.cc5 = cc5;
    if (cc6) accounts.cc6 = cc6;
    if (cash) accounts.cash = cash;
    if (detail1) accounts.detail1 = detail1;
    if (detail2) accounts.detail2 = detail2;
    if (detail3) accounts.detail3 = detail3;
    if (detail4) accounts.detail4 = detail4;
    if (detail5) accounts.detail5 = detail5;
    if (other1) accounts.other1 = other1;
    if (other2) accounts.other2 = other2;
    if (other3) accounts.other3 = other3;
    if (savings1) accounts.savings1 = savings1;
    if (savings2) accounts.savings2 = savings2;
    if (savings3) accounts.savings3 = savings3;
    return accounts;
  },

  processCcPayment: function (payment) {
    let paymentObject = {};
    if (payment.cc1) paymentObject.cc1 = payment.cc1;
    if (payment.cc2) paymentObject.cc2 = payment.cc2;
    if (payment.cc3) paymentObject.cc3 = payment.cc3;
    if (payment.cc4) paymentObject.cc4 = payment.cc4;
    if (payment.cc5) paymentObject.cc5 = payment.cc5;
    if (payment.cc6) paymentObject.cc6 = payment.cc6;
    return paymentObject;
  },

  processExpenses: function (expenses) {
    let expenseObject = {};
    if (expenses.shelter) expenseObject.shelter = expenses.shelter;
    if (expenses.util1) expenseObject.util1 = expenses.util1;
    if (expenses.util2) expenseObject.util2 = expenses.util2;
    if (expenses.util3) expenseObject.util3 = expenses.util3;
    if (expenses.util4) expenseObject.util4 = expenses.util4;
    if (expenses.util5) expenseObject.util5 = expenses.util5;
    if (expenses.car) expenseObject.car = expenses.car;
    if (expenses.insurance) expenseObject.insurance = expenses.insurance;
    if (expenses.other1) expenseObject.other1 = expenses.other1;
    if (expenses.other2) expenseObject.other2 = expenses.other2;
    if (expenses.other3) expenseObject.other3 = expenses.other3;
    return expenseObject;
  },

  processChecking: function (transactions) {
    let checkingObject = {
      source: 'checking',
      day: transactions.day,
      income: transactions.income,
      category: transactions.category,
      amount: transactions.amount,
      description: transactions.description
    };

    //  since this transaction can be a credit or a debit based on a boolean,
    //  this part prepares it here so it can skip the calc method 
    //  in the Expenses model.
    if (transactions.income) {
      checkingObject.checkingCredit = transactions.amount;
      checkingObject.checkingDebit = 0;
    } else {
      checkingObject.checkingCredit = 0;
      checkingObject.checkingDebit = transactions.amount
    }
    return checkingObject;
  },

  processSavings: function (savings) {
    let savingsObject = {};
    if (savings.savings1) savingsObject.savings1 = savings.savings1;
    if (savings.savings2) savingsObject.savings2 = savings.savings2;
    if (savings.savings3) savingsObject.savings3 = savings.savings3;
    return savingsObject;
  },

  processSavingsToChecking: function (transactions) {
    let transactionObject = {};
    let checkingCredit = '0.00';
    const savToCheckFunction = function (field1, transaction, field2) {
      transactionObject[field1] = transaction;
      transactionObject[field2] = '0.00';
      checkingCredit = Money.add(checkingCredit, parseFloat(transaction).toFixed(2).toString())
    }

    if (transactions.source === 'savings1') savToCheckFunction('savings1Debit', transactions.amount, 'savings1Credit');
    if (transactions.source === 'savings2') savToCheckFunction('savings2Debit', transactions.amount, 'savings2Credit');
    if (transactions.source === 'savings3') savToCheckFunction('savings3Debit', transactions.amount, 'savings3Credit');

    transactionObject.checkingCredit = checkingCredit;
    transactionObject.checkingDebit = '0.00';
    return transactionObject;
  },

  processMonthOutgo: function (debits, expenses) {
    let { car, cc1, cc2, cc3, cc4, cc5, cc6, insurance, other1, other2, other3, shelter, util1, util2, util3, util4, util5 } = expenses;
    let totalDebits = "0.00";
    let outFlowObject = {};
    let totalExpenses;

    debits.forEach(element => {
      totalDebits = Money.add(totalDebits, element.amount);
    });

    //  money-math must have the numbers formatted as strings with two decimal places
    //  otherwise it throws an error.
    //  New expense sheets (which are created on date change if they don't exist)
    //  return numbers as type Number rather than strings the first time.
    if (!car) car = '0.00';
    if (!cc1) cc1 = '0.00';
    if (!cc2) cc2 = '0.00';
    if (!cc3) cc3 = '0.00';
    if (!cc4) cc4 = '0.00';
    if (!cc5) cc5 = '0.00';
    if (!cc6) cc6 = '0.00';
    if (!insurance) insurance = '0.00';
    if (!other1) other1 = '0.00';
    if (!other2) other2 = '0.00';
    if (!other3) other3 = '0.00';
    if (!shelter) shelter = '0.00';
    if (!util1) util1 = '0.00';
    if (!util2) util2 = '0.00';
    if (!util3) util3 = '0.00';
    if (!util4) util4 = '0.00';
    if (!util5) util5 = '0.00';

    totalExpenses = Money.add(
      Money.add(car, cc1).toString(),
      Money.add(
        Money.add(
          Money.add(
            Money.add(cc2, cc3).toString(),
            Money.add(cc4, cc5).toString()
          ).toString(),
          Money.add(
            Money.add(cc6, totalDebits.toString()).toString(),
            Money.add(insurance, other1).toString()
          ).toString()
        ).toString(),
        Money.add(
          Money.add(
            Money.add(other2, other3).toString(),
            Money.add(shelter, util1).toString()
          ).toString(),
          Money.add(
            Money.add(util2, util3).toString(),
            Money.add(util4, util5).toString()
          ).toString()
        ).toString()
      ).toString()
    )

    outFlowObject.totalDebits = totalDebits;
    outFlowObject.totalExpenses = totalExpenses;
    outFlowObject.totalBills = Money.subtract(totalExpenses.toString(), totalDebits.toString())

    return outFlowObject;
  },

  processMonthCcSpend: function (ccSpend) {
    let { cc1, cc2, cc3, cc4, cc5, cc6 } = ccSpend;

    if (!cc1) cc1 = '0.00';
    if (!cc2) cc2 = '0.00';
    if (!cc3) cc3 = '0.00';
    if (!cc4) cc4 = '0.00';
    if (!cc5) cc5 = '0.00';
    if (!cc6) cc6 = '0.00';

    const totalCcSpend = Money.add(
      Money.add(
        Money.add(cc1, cc2).toString(),
        Money.add(cc3, cc4).toString()
      ),
      Money.add(cc5, cc6).toString()
    )
    return totalCcSpend;
  },

  processMonthDetails: function (details) {
    let detail1 = 0;
    let detail2 = 0;
    let detail3 = 0;
    let detail4 = 0;
    let detail5 = 0;
    let detailObject = {}

    details[0].forEach(det => {
      detail1 = Money.add(detail1.toString(), det.amount);
    });

    details[1].forEach(det => {
      detail2 = Money.add(detail2.toString(), det.amount);
    });

    details[2].forEach(det => {
      detail3 = Money.add(detail3.toString(), det.amount);
    });

    details[3].forEach(det => {
      detail4 = Money.add(detail4.toString(), det.amount);
    });

    details[4].forEach(det => {
      detail5 = Money.add(detail5.toString(), det.amount);
    });

    detailObject.detail1 = detail1;
    detailObject.detail2 = detail2;
    detailObject.detail3 = detail3;
    detailObject.detail4 = detail4;
    detailObject.detail5 = detail5;

    return detailObject;
  },

  processMonthIncome: function (income) {
    let totalIncome = "0.00";
    income.forEach(inc => {
      totalIncome = Money.add(totalIncome, inc.amount);
    });
    return totalIncome;
  },

  processMonthCcPayments: function (expenses, totalCcSpend) {
    let { cc1, cc2, cc3, cc4, cc5, cc6 } = expenses;

    if (!cc1) cc1 = '0.00';
    if (!cc2) cc2 = '0.00';
    if (!cc3) cc3 = '0.00';
    if (!cc4) cc4 = '0.00';
    if (!cc5) cc5 = '0.00';
    if (!cc6) cc6 = '0.00';

    const totalCcPayments = Money.add(
      Money.add(
        Money.add(cc1, cc2).toString(),
        Money.add(cc3, cc4).toString()
      ),
      Money.add(cc5, cc6).toString()
    ).toString();

    let paymentObject = {}
    paymentObject.totalCcPayments = totalCcPayments;

    if (parseFloat(totalCcPayments) > parseFloat(totalCcSpend))
      paymentObject.surplus = Money.subtract(totalCcPayments, totalCcSpend);
    if (parseFloat(totalCcPayments) < parseFloat(totalCcSpend))
      paymentObject.deficit = Money.subtract(totalCcSpend, totalCcPayments);
    if (parseFloat(totalCcPayments) === parseFloat(totalCcSpend))
      paymentObject.even = true;

    return paymentObject;
  },

  processChkDiff: function (totalExpenses, totalIncome) {
    let diffObject = {};
    if (parseFloat(totalExpenses) > parseFloat(totalIncome))
      diffObject.deficit = Money.subtract(totalExpenses.toString(), totalIncome.toString());
    if (parseFloat(totalExpenses) < parseFloat(totalIncome))
      diffObject.surplus = Money.subtract(totalIncome.toString(), totalExpenses.toString());
    if (parseFloat(totalExpenses) === parseFloat(totalIncome))
      diffObject.even = true;
    return diffObject;
  },

  processTotalSpending: function (check, credit) {
    let checkSurplus;
    let checkDeficit;
    let creditSurplus;
    let creditDeficit;
    if (check.surplus) checkSurplus = parseFloat(check.surplus)
    if (check.deficit) checkDeficit = parseFloat(check.deficit)
    if (credit.surplus) creditSurplus = parseFloat(credit.surplus)
    if (credit.deficit) creditDeficit = parseFloat(credit.deficit)
    let difference = {}
    if (checkSurplus && credit.surplus) {
      difference.message = "You are making more than you spend, and your finances seem to be balanced. Excellent."
      difference.surplusBoth = true;
    }

    if (checkSurplus && creditDeficit && (checkSurplus > creditDeficit)) {
      difference.message = "You are making more than you spend, but you are accumulating debt. You should raise your CC payments or spend less on credit."
      difference.surplus = Money.subtract(check.surplus, credit.deficit);
    }
    else if (checkSurplus && creditDeficit && (checkSurplus < creditDeficit)) {
      difference.message = "You are spending more than you make. You should spend less on credit or bring in more income and raise your CC payments."
      difference.deficit = Money.subtract(credit.deficit, check.surplus);
    }
    else if (checkSurplus && creditDeficit && (checkSurplus === creditDeficit)) {
      difference.message = "You are breaking even overall, but you are accumulating debt. You should spend less on credit or bring in more income and raise your CC payments."
      difference.even = true;
    }

    if (checkDeficit && creditSurplus && (checkDeficit > creditSurplus)) {
      difference.message = "You are spending more than you make. You should spend less on credit and lower your CC payments and/or bring in more income."
      difference.deficit = Money.subtract(check.deficit, credit.surplus);
    }
    else if (checkDeficit && creditSurplus && (checkDeficit < creditSurplus)) {
      difference.message = "You are making more than you spend, but creating a deficit with too-large CC payments. You should lower your CC payments."
      difference.surplus = Money.subtract(credit.surplus, check.deficit);
    }
    else if (checkDeficit && creditSurplus && (checkDeficit === creditSurplus)) {
      difference.message = "You are breaking even overall, but your too-large CC payments are creating a deficit. You should bring in more income or lower your CC payments."
      difference.even = true;
    }

    if (checkDeficit && creditDeficit) {
      difference.message = "You are making less than you spend. You should bring in more income."
      difference.deficitBoth = true;
    }

    if (check.even && credit.even) {
      difference.message = "You are breaking even overall. You should bring in more income or spend less on credit."
      difference.even = true;
    }
    else if (check.even && creditDeficit) {
      difference.message = "You are spending more than you make and you are accumulating debt. You should either spend less on credit or bring in more income and raise your CC payments."
    }
    else if (check.even && creditSurplus) {
      difference.message = "You are making more than you spend and you are paying down debt. Good job."
    }
    else if (credit.even && checkDeficit) {
      difference.message = "You are spending more than you make. You should spend less on credit and/or bring in more income."
    }
    else if (credit.even && checkSurplus) {
      difference.message = "You are making more than you spend and you are not accumulating debt. If you have debt, consider paying it down. Otherwise, good job."
    }

    return difference;
  }


}