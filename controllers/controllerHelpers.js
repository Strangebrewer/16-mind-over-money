const db = require("../models");
const money = require("money-math");
// const Sequelize = require("sequelize");

module.exports = {
  processCcPayments: function (req) {
    const where = {
      $and: [
        { UserId: req.user.id },
        { month: req.params.month },
        { year: req.params.year },
        { payment: true }
      ]
    }

    const defaults = {
      UserId: req.user.id,
      year: req.params.year,
      month: req.params.month,
      payment: true
    }

    const paymentFunction = function (item, database) {
      defaults.amount = item;
      db[database].findOrCreate({ where: where, defaults: defaults })
        .then(() => {
          db[database].update({ amount: item }, { where: where })
            .then(result => console.log(result))
            .catch(err => console.log(err));
        });
    }

    if (req.body.cc1) paymentFunction(req.body.cc1, 'CC1');
    if (req.body.cc2) paymentFunction(req.body.cc2, 'CC2');
    if (req.body.cc3) paymentFunction(req.body.cc3, 'CC3');
    if (req.body.cc4) paymentFunction(req.body.cc4, 'CC4');
    if (req.body.cc5) paymentFunction(req.body.cc5, 'CC5');
    if (req.body.cc6) paymentFunction(req.body.cc6, 'CC6');
  },

  processCcCharge: function (req) {
    const ccObject = {
      UserId: req.user.id,
      year: req.params.year,
      month: req.params.month,
      day: req.body.day,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description
    }
    let query;

    if (req.body.source === 'cc1') query = db.CC1.create(ccObject);
    if (req.body.source === 'cc2') query = db.CC2.create(ccObject);
    if (req.body.source === 'cc3') query = db.CC3.create(ccObject);
    if (req.body.source === 'cc4') query = db.CC4.create(ccObject);
    if (req.body.source === 'cc5') query = db.CC5.create(ccObject);
    if (req.body.source === 'cc6') query = db.CC6.create(ccObject);

    query
      .then(charge => console.log(charge))
      .catch(err => console.log(err));
  },

  processDetail: function (req) {
    const detailObject = {
      UserId: req.user.id,
      year: req.params.year,
      month: req.params.month,
      day: req.body.day,
      amount: req.body.amount,
      description: req.body.description,
      source: req.body.source
    }
    let query;

    if (req.body.category) {
      if (req.body.category === 'detail1') query = db.Detail1.create(detailObject);
      if (req.body.category === 'detail2') query = db.Detail2.create(detailObject);
      if (req.body.category === 'detail3') query = db.Detail3.create(detailObject);
      if (req.body.category === 'detail4') query = db.Detail4.create(detailObject);
      if (req.body.category === 'detail5') query = db.Detail5.create(detailObject);

      query
        .then(detail => console.log(detail))
        .catch(err => console.log(err));
    }
  },

  processNameDeletion: function (req, names) {
    const { checking, shelter, util1, util2, util3, util4, util5, car, insurance, cc1, cc2, cc3, cc4, cc5, cc6, cash, detail1, detail2, detail3, detail4, detail5, other1, other2, other3, savings1, savings2, savings3, setup_names } = names;
    const nameObject = { setup_names: setup_names };

    //  First, the defaults. These are required but aren't tracked in detail, so there's no point in deleting them and starting over.
    if (checking === 'delete') nameObject.checking = 'Checking';
    else if (checking) nameObject.checking = checking;

    if (shelter === 'delete') nameObject.shelter = 'Housing';
    else if (shelter) nameObject.shelter = shelter;

    if (util1 === 'delete') nameObject.util1 = 'Utilities';
    else if (util1) nameObject.util1 = util1;

    if (cash === 'delete') nameObject.cash = 'Cash';
    else if (cash) nameObject.cash = cash;

    if (savings1 === 'delete') nameObject.savings1 = 'Savings';
    else if (savings1) nameObject.savings1 = savings1;

    //  Next, the other untracked ones. These can be deleted and completely emptied
    //  Allowing the user to start over.
    const expenseUpdateFunction = function (database, field, item) {
      if (item === 'delete') {
        db[database].update({ [field]: '0.00' }, { where: { UserId: req.user.id } })
        nameObject[field] = null;
      } else if (item) nameObject[field] = item;
    }

    expenseUpdateFunction('Expenses', 'util2', util2);
    expenseUpdateFunction('Expenses', 'util3', util3);
    expenseUpdateFunction('Expenses', 'util4', util4);
    expenseUpdateFunction('Expenses', 'util5', util5);
    expenseUpdateFunction('Expenses', 'car', car);
    expenseUpdateFunction('Expenses', 'insurance', insurance);
    expenseUpdateFunction('Expenses', 'other1', other1);
    expenseUpdateFunction('Expenses', 'other2', other2);
    expenseUpdateFunction('Expenses', 'other3', other3);
    expenseUpdateFunction('Expenses', 'savings2', savings2);
    expenseUpdateFunction('Expenses', 'savings3', savings3);

    //  Next, the required and tracked ones. If these are deleted, all records are deleted
    const srcDeleted = { source: 'deleted' };
    const catDeleted = { category: 'deleted' };

    const detailUpdates = function (category) {
      db.CC1.update(catDeleted, { where: { $and: [{ UserId: req.user.id }, category] } });
      db.CC2.update(catDeleted, { where: { $and: [{ UserId: req.user.id }, category] } });
      db.CC3.update(catDeleted, { where: { $and: [{ UserId: req.user.id }, category] } });
      db.CC4.update(catDeleted, { where: { $and: [{ UserId: req.user.id }, category] } });
      db.CC5.update(catDeleted, { where: { $and: [{ UserId: req.user.id }, category] } });
      db.CC6.update(catDeleted, { where: { $and: [{ UserId: req.user.id }, category] } });
      db.Checking.update(catDeleted, { where: { $and: [{ UserId: req.user.id }, category] } });
    }

    const ccUpdates = function (source, zeroes) {
      db.CCSpend.update(zeroes, { where: { UserId: req.user.id } });
      db.Balance.update(zeroes, { where: { UserId: req.user.id } });
      db.Expenses.update(zeroes, { where: { UserId: req.user.id } });
      db.Detail1.update(srcDeleted, { where: { $and: [{ UserId: req.user.id }, source] } });
      db.Detail2.update(srcDeleted, { where: { $and: [{ UserId: req.user.id }, source] } });
      db.Detail3.update(srcDeleted, { where: { $and: [{ UserId: req.user.id }, source] } });
      db.Detail4.update(srcDeleted, { where: { $and: [{ UserId: req.user.id }, source] } });
      db.Detail5.update(srcDeleted, { where: { $and: [{ UserId: req.user.id }, source] } });
    }

    const destroyFunction = function (database, objectKey, callback, field, value, item) {
      if (item === 'delete') {
        db[database].destroy({ where: { UserId: req.user.id } });
        nameObject[objectKey] = value;
        callback({ [field]: objectKey }, { [objectKey]: '0.00' })
      } else if (item) nameObject[objectKey] = item;
    }

    destroyFunction('CC1', 'cc1', ccUpdates, 'source', 'Credit Card 1', cc1);
    destroyFunction('Detail1', 'detail1', detailUpdates, 'category', 'Gas', detail1);
    destroyFunction('Detail2', 'detail2', detailUpdates, 'category', 'Food', detail2);

    //  And last, the ones that are tracked in detail, but are not required.
    destroyFunction('CC2', 'cc2', ccUpdates, 'source', null, cc2);
    destroyFunction('CC3', 'cc3', ccUpdates, 'source', null, cc3);
    destroyFunction('CC4', 'cc4', ccUpdates, 'source', null, cc4);
    destroyFunction('CC5', 'cc5', ccUpdates, 'source', null, cc5);
    destroyFunction('CC6', 'cc6', ccUpdates, 'source', null, cc6);
    destroyFunction('Detail3', 'detail3', detailUpdates, 'category', null, detail3);
    destroyFunction('Detail4', 'detail4', detailUpdates, 'category', null, detail4);
    destroyFunction('Detail5', 'detail5', detailUpdates, 'category', null, detail5);

    return nameObject;
  },

  deleteDetail: function (user, body) {
    let { amount, category, day, month, year } = body;
    if (!body.card) body.card = 'checking';
    if (category && category !== 'deleted') {
      const detailDestroy = {
        where: {
          $and: [
            { day: day },
            { month: month },
            { year: year },
            { amount: amount },
            { UserId: user.id },
            { source: body.card }
          ]
        }
      }

      let detailQuery;
      if (category === 'detail1') detailQuery = db.Detail1.destroy(detailDestroy);
      if (category === 'detail2') detailQuery = db.Detail2.destroy(detailDestroy);
      if (category === 'detail3') detailQuery = db.Detail3.destroy(detailDestroy);
      if (category === 'detail4') detailQuery = db.Detail4.destroy(detailDestroy);
      if (category === 'detail5') detailQuery = db.Detail5.destroy(detailDestroy);

      detailQuery
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  },

  updateDetailSource: function (user, body) {
    const { day, month, year, amount, source } = body;
    const whereAnd = {
      where: {
        $and: [
          { day: day },
          { month: month },
          { year: year },
          { amount: amount },
          { UserId: user.id }
        ]
      }
    };

    let query;
    if (source === 'checking') query = db.Checking.update({ category: null }, whereAnd);
    if (source === 'cc1') query = db.CC1.update({ category: null }, whereAnd);
    if (source === 'cc2') query = db.CC2.update({ category: null }, whereAnd);
    if (source === 'cc3') query = db.CC3.update({ category: null }, whereAnd);
    if (source === 'cc4') query = db.CC4.update({ category: null }, whereAnd);
    if (source === 'cc5') query = db.CC5.update({ category: null }, whereAnd);
    if (source === 'cc6') query = db.CC6.update({ category: null }, whereAnd);

    query
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  updateCCSpendAndBalance: function (user, body) {
    const { month, year, amount, payment, card } = body;
    const where = {
      where: {
        $and: [
          { UserId: user.id },
          { month: month },
          { year: year }
        ]
      }
    }
    const calcCCSpendUpdate = function (recordCard, amt, card) {
      const update = money.subtract(
        parseFloat(recordCard).toFixed(2).toString(),
        parseFloat(amt).toFixed(2).toString()
      );
      db.CCSpend.update({ [card]: update }, where)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    if (!payment) {
      db.CCSpend.findOne(where)
        .then(record => {
          if (card === 'cc1') calcCCSpendUpdate(record.cc1, amount, card);
          if (card === 'cc2') calcCCSpendUpdate(record.cc2, amount, card);
          if (card === 'cc3') calcCCSpendUpdate(record.cc3, amount, card);
          if (card === 'cc4') calcCCSpendUpdate(record.cc4, amount, card);
          if (card === 'cc5') calcCCSpendUpdate(record.cc5, amount, card);
          if (card === 'cc6') calcCCSpendUpdate(record.cc6, amount, card);
        })
    }

    db.Balance.findOne({ where: { UserId: user.id } })
      .then(balance => {

        const formatAmt = parseFloat(amount).toFixed(2).toString();
        const formatChk = parseFloat(balance.checking).toFixed(2).toString();
        let ccBalance;
        let updateObj = {};

        if (card === 'cc1') ccBalance = parseFloat(balance.cc1).toFixed(2).toString();
        if (card === 'cc2') ccBalance = parseFloat(balance.cc2).toFixed(2).toString();
        if (card === 'cc3') ccBalance = parseFloat(balance.cc3).toFixed(2).toString();
        if (card === 'cc4') ccBalance = parseFloat(balance.cc4).toFixed(2).toString();
        if (card === 'cc5') ccBalance = parseFloat(balance.cc5).toFixed(2).toString();
        if (card === 'cc6') ccBalance = parseFloat(balance.cc6).toFixed(2).toString();

        //  If the CC Record is a payment, it has to be added back to both the checking
        //   and the CC balances.
        //  It also has to be removed from the expenses table for that month
        //   since CC payments are recorded as a monthly expense.
        if (payment) {
          updateObj.checking = money.add(formatChk, formatAmt);
          updateObj[card] = money.add(ccBalance, formatAmt);
          db.Expenses.update({ [card]: 0.00 }, where)
            .then(result => console.log(result))
            .catch(err => console.log(err));
        } else updateObj[card] = money.subtract(ccBalance, formatAmt);

        db.Balance.update(updateObj, { where: { UserId: user.id } })
          .then(result => console.log(result))
          .catch(err => console.log(err));

      }).catch(err => console.log(err));
  }

}