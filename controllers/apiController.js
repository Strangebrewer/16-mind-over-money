const db = require("../models");
const Help = require("./controllerHelpers");

module.exports = {
  setupNames: function (req, res) {
    const names = Help.processNameDeletion(req, req.body);
    db.User.update(names, { where: { id: req.user.id } })
      .then(() => {
        db.User.findOne({ where: { id: req.user.id } })
          .then(data => res.json(data))
          .catch(err => console.log(err));
      })
      .catch(err => res.send(err));
  },

  getAccountNames: function (req, res) {
    db.User.findOne({ where: { id: req.user.id } })
      .then(data => res.json(data))
      .catch(err => res.send(err));
  },

  setupBalances: function (req, res) {
    db.Balance.update(req.body, { where: { UserId: req.user.id } })
      .then(data => {
        db.User.update({ setup_balances: req.body.setup_balances },
          { where: { id: req.user.id } })
          .then(response => res.send({ data: data, update: response }))
          .catch(err => console.log(err));
      })
      .catch(err => res.send(err));
  },

  getFinances: function (req, res) {
    const whereAnd = {
      where: {
        $and: [{ UserId: req.user.id }, { month: req.params.month }, { year: req.params.year }]
      }
    }
    const whereAndDefaults = {
      where: {
        $and: [
          { UserId: req.user.id },
          { month: req.params.month },
          { year: req.params.year }
        ]
      },
      defaults: {
        UserId: req.user.id,
        month: req.params.month,
        year: req.params.year
      }
    }

    db.User.findOne({
      include: [
        { model: db.Balance },
      ],
      where: { id: req.user.id }
    }).then(currentData => {

      Promise.all([
        db.Expenses.findOrCreate(whereAndDefaults),
        db.Checking.findAll(whereAnd),
        db.CCSpend.findOrCreate(whereAndDefaults)
      ]).then(transData => {
        
        Promise.all([
          db.Detail1.findAll(whereAnd),
          db.Detail2.findAll(whereAnd),
          db.Detail3.findAll(whereAnd),
          db.Detail4.findAll(whereAnd),
          db.Detail5.findAll(whereAnd),
        ]).then(deetsData => res.send({
          transactions: transData,
          current: currentData,
          details: deetsData
        })).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => res.send(err));
  },

  getBalances: function (req, res) {
    db.Balance.findOne({ where: { UserId: req.user.id } })
      .then(data => res.json(data))
      .catch(err => res.send(err));
  },

  getExpenses: function (req, res) {
    db.Expenses.findOrCreate({
      where: {
        $and: [
          { UserId: req.user.id },
          { month: req.params.month },
          { year: req.params.year }
        ]
      },
      defaults: {
        UserId: req.user.id,
        month: req.params.month,
        year: req.params.year
      }
    })
      .then(data => res.json(data))
      .catch(err => res.send(err));
  },

  // BEGIN UPDATE EXPENSES FUNCTION
  updateExpenses: function (req, res) {
    const whereAnd = {
      where: {
        $and: [{ UserId: req.user.id }, { month: req.params.month }, { year: req.params.year }]
      }
    }
    db.Expenses.findOne(whereAnd)
      .then(exp => {
        const checkingObj = db.Expenses.calcCheckingDiff(req.body, exp);
        const savingsObj = db.Expenses.calcSavingsDiff(req.body, exp);
        const diffObj = Object.assign({}, checkingObj, savingsObj);

        db.Balance.findOne({ where: { UserId: req.user.id } })
          .then(bal => {
            const balanceObj = bal.calcBalanceUpdate(diffObj);

            db.Balance.update(balanceObj, { where: { UserId: req.user.id } })
              .then(() => {

                db.Expenses.update(req.body, whereAnd)
                  .then(() => {

                    Promise.all([
                      db.Balance.findOne({ where: { UserId: req.user.id } }),
                      db.Expenses.findOne(whereAnd)
                    ]).then(values => res.json(values))
                      .catch(err => console.log(err));
                  })
              })
              .catch(err => console.log(err));
          })
          .catch(error => console.log(error));
      })
  },
  // END UPDATE EXPENSES FUNCTION

  updateSavings: function (req, res) {
    db.Expenses.findOne({
      where: {
        $and: [
          { UserId: req.user.id },
          { month: req.params.month },
          { year: req.params.year }
        ]
      }
    }).then(exp => {
      const checkingObj = db.Expenses.calcCheckingDiff(req.body, exp);
      const savingsObj = db.Expenses.calcSavingsDiff(req.body, exp);
      const updateObj = Object.assign({}, checkingObj, savingsObj);      
      const whereAnd = {
        where: {
          $and: [{ UserId: req.user.id }, { month: req.params.month }, { year: req.params.year }]
        }
      }

      db.Balance.findOne({
        where: { UserId: req.user.id }
      }).then(bal => {
        const balanceObj = bal.calcBalanceUpdate(updateObj);

        db.Balance.update(balanceObj, { where: { UserId: req.user.id } })
          .then(() => {

            db.Expenses.update(req.body, whereAnd)
              .then(() => {

                Promise.all([
                  db.Balance.findOne({ where: { UserId: req.user.id } }),
                  db.Expenses.findOne(whereAnd)
                ]).then(values => res.json(values))
                  .catch(err => console.log(err));
              })
          })
      })
    })
  },

  savingsToChecking: function (req, res) {
    db.Balance.findOne({ where: { UserId: req.user.id } })
      .then(bal => {
        const balanceObj = bal.calcBalanceUpdate(req.body);

        db.Balance.update(balanceObj, { where: { UserId: req.user.id } })
          .then(() => {

            db.Balance.findOne({ where: { UserId: req.user.id } })
              .then(balances => res.json(balances))
              .catch(err => console.log(err));
          })

      }).catch(err => res.send(err));
  },

  updateChecking: function (req, res) {
    Help.processDetail(req);

    const whereAnd = {
      where: {
        $and: [{ UserId: req.user.id }, { month: req.params.month }, { year: req.params.year }]
      }
    }

    db.Balance.findOne({ where: { UserId: req.user.id } })
      .then(bal => {
        const balanceObj = bal.calcBalanceUpdate(req.body);

        db.Checking.create({
          UserId: req.user.id,
          year: req.params.year,
          month: req.params.month,
          day: req.body.day,
          income: req.body.income,
          amount: req.body.amount,
          category: req.body.category,
          description: req.body.description
        })
          .then(result => console.log(result))
          .catch(err => console.log(err));
        db.Balance.update(balanceObj, { where: { UserId: req.user.id } })
          .then(() => {

            Promise.all([
              db.Balance.findOne({ where: { UserId: req.user.id } }),
              db.Checking.findAll(whereAnd),
              db.Detail1.findAll(whereAnd),
              db.Detail2.findAll(whereAnd),
              db.Detail3.findAll(whereAnd),
              db.Detail4.findAll(whereAnd),
              db.Detail5.findAll(whereAnd)
            ]).then(values => res.json(values))
              .catch(err => res.send(err));
          })
      })
  },

  creditCardPayment: function (req, res) {
    Help.processCcPayments(req);

    const whereAnd = {
      where: {
        $and: [{ UserId: req.user.id }, { month: req.params.month }, { year: req.params.year }]
      }
    }

    db.Expenses.findOne(whereAnd)
      .then(exp => {
        const checkingObj = db.Expenses.calcCheckingDiff(req.body, exp);
        const creditObj = db.Expenses.calcCreditDiff(req.body, exp);
        const updateObj = Object.assign({}, checkingObj, creditObj);

        db.Balance.findOne({ where: { UserId: req.user.id } })
          .then(bal => {
            const balanceObj = bal.calcBalanceUpdate(updateObj);

            db.Balance.update(balanceObj, { where: { UserId: req.user.id } })
              .then(() => {
                db.Expenses.update(req.body, whereAnd)
                  .then(() => {
                    
                    Promise.all([
                      db.Balance.findOne({ where: { UserId: req.user.id } }),
                      db.Expenses.findOne(whereAnd)
                    ]).then(values => res.json(values))
                      .catch(err => console.log(err));
                  })
              })
          })
      })

  },

  creditCardCharge: function (req, res) {
    Help.processCcCharge(req);
    Help.processDetail(req);
    const whereAnd = {
      where: {
        $and: [{ UserId: req.user.id }, { month: req.params.month }, { year: req.params.year }]
      }
    }
    db.CCSpend.findOne(whereAnd)
      .then(ccSpend => {
        ccSpend.increment(req.body.source, { by: req.body.amount })
        db.Balance.findOne({
          where: { UserId: req.user.id }
        })
          .then(balance => {
            balance.increment(req.body.source, { by: req.body.amount })
            Promise.all([
              db.Balance.findOne({ where: { UserId: req.user.id } }),
              db.CCSpend.findOne(whereAnd),
              db.Detail1.findAll(whereAnd),
              db.Detail2.findAll(whereAnd),
              db.Detail3.findAll(whereAnd),
              db.Detail4.findAll(whereAnd),
              db.Detail5.findAll(whereAnd),
            ]).then(deets => {
              res.json(deets)
            })
              .catch(err => console.log(err));
          })
      }).then(ccSpend => console.log(ccSpend))
      .catch(err => res.send(err))
  }

};