const db = require("../models");
const money = require("money-math");
const Sequelize = require("sequelize");
const Help = require("./controllerHelpers");

module.exports = {

  getExpenses: function (req, res) {
    db.User.findOne({
      include: [db.Expenses],
      where: { id: req.user.id }
    })
      .then(data => res.json(data))
      .catch(err => res.send(err));
  },

  getCcRecords: function (req, res) {
    const card = req.params.card;
    let query;

    switch (card) {
      case 'cc1': query = db.CC1.findAll({ where: { UserId: req.user.id } }); break;
      case 'cc2': query = db.CC2.findAll({ where: { UserId: req.user.id } }); break;
      case 'cc3': query = db.CC3.findAll({ where: { UserId: req.user.id } }); break;
      case 'cc4': query = db.CC4.findAll({ where: { UserId: req.user.id } }); break;
      case 'cc5': query = db.CC5.findAll({ where: { UserId: req.user.id } }); break;
      case 'cc6': query = db.CC6.findAll({ where: { UserId: req.user.id } }); break;
      case 'all': query = db.CCSpend.findAll({ where: { UserId: req.user.id } }); break;
      default: console.log("No card match found.");
    }

    query
      .then(records => res.json(records))
      .catch(err => res.send(err));
  },

  getAllChecking: function (req, res) {
    db.Checking.findAll({ where: { UserId: req.user.id } })
      .then(records => res.json(records))
      .catch(err => res.send(err));
  },

  getDetailRecords: function (req, res) {
    const category = req.params.category;
    let query;
    switch (category) {
      case 'detail1': query = db.Detail1.findAll({ where: { UserId: req.user.id } }); break;
      case 'detail2': query = db.Detail2.findAll({ where: { UserId: req.user.id } }); break;
      case 'detail3': query = db.Detail3.findAll({ where: { UserId: req.user.id } }); break;
      case 'detail4': query = db.Detail4.findAll({ where: { UserId: req.user.id } }); break;
      case 'detail5': query = db.Detail5.findAll({ where: { UserId: req.user.id } }); break;
      default: console.log("No category match found.");
    }
    query
      .then(records => res.json(records))
      .catch(err => res.send(err));
  },

  getCCSpend: function (req, res) {
    db.CCSpend.findAll({ where: { UserId: req.user.id } })
      .then(records => res.json(records))
      .catch(err => res.send(err));
  },

  changeBalances: function (req, res) {
    db.Balance.findOne({ where: { UserId: req.user.id } })
      .then(balance => {
        const updateObject = balance.processBalanceAdjust(req.body);
        db.Balance.update(updateObject,
          { where: { UserId: req.user.id } }
        ).then(() => {
          db.Balance.findOne({ where: { UserId: req.user.id } })
            .then(balance => res.json(balance))
            .catch(err => res.send(err));
        });
      });
  },

  getUserAndBalances: function (req, res) {
    db.User.findOne({
      include: [db.Balance],
      where: { id: req.user.id }
    }).then(data => res.json(data))
      .catch(err => res.send(err));
  },

  updateNote: function (req, res) {
    const { source, id, newNote, category, day, month, year, amount } = req.body;
    let promiseArray = [];
    const note = { note: newNote };
    const sourceWhere = { where: { id: id } };

    const categoryWhere = {
      where: {
        $and: [{ UserId: req.user.id }, { day: day }, { month: month }, { year: year }, { amount: amount }]
      }
    }

    switch (source) {
      case 'checking': promiseArray.push(db.Checking.update(note, sourceWhere)); break;
      case 'cc1': promiseArray.push(db.CC1.update(note, sourceWhere)); break;
      case 'cc2': promiseArray.push(db.CC2.update(note, sourceWhere)); break;
      case 'cc3': promiseArray.push(db.CC3.update(note, sourceWhere)); break;
      case 'cc4': promiseArray.push(db.CC4.update(note, sourceWhere)); break;
      case 'cc5': promiseArray.push(db.CC5.update(note, sourceWhere)); break;
      case 'cc6': promiseArray.push(db.CC6.update(note, sourceWhere)); break;
      default: console.log("No source match found.");
    }
    switch (category) {
      case 'detail1': promiseArray.push(db.Detail1.update(note, categoryWhere)); break;
      case 'detail2': promiseArray.push(db.Detail2.update(note, categoryWhere)); break;
      case 'detail3': promiseArray.push(db.Detail3.update(note, categoryWhere)); break;
      case 'detail4': promiseArray.push(db.Detail4.update(note, categoryWhere)); break;
      case 'detail5': promiseArray.push(db.Detail5.update(note, categoryWhere)); break;
      default: console.log("No category match found.");
    }

    Promise.all(promiseArray)
      .then(result => res.json(result))
      .catch(err => res.send(err));
  },

  updateDetailNote: function (req, res) {
    const { source, id, newNote, day, detail, month, year, amount } = req.body;
    let promiseArray = [];
    const note = { note: newNote };
    const detailWhere = { where: { id: id } };

    const sourceWhere = {
      where: {
        $and: [{ UserId: req.user.id }, { day: day }, { month: month }, { year: year }, { amount: amount }]
      }
    };

    switch (detail) {
      case 'detail1': promiseArray.push(db.Detail1.update(note, detailWhere)); break;
      case 'detail1': promiseArray.push(db.Detail1.update(note, detailWhere)); break;
      case 'detail3': promiseArray.push(db.Detail3.update(note, detailWhere)); break;
      case 'detail4': promiseArray.push(db.Detail4.update(note, detailWhere)); break;
      case 'detail5': promiseArray.push(db.Detail5.update(note, detailWhere)); break;
      default: console.log("No detail match found.");
    }
    switch (source) {
      case 'checking': promiseArray.push(db.Checking.update(note, sourceWhere)); break;
      case 'cc1': promiseArray.push(db.CC1.update(note, sourceWhere)); break;
      case 'cc2': promiseArray.push(db.CC2.update(note, sourceWhere)); break;
      case 'cc3': promiseArray.push(db.CC3.update(note, sourceWhere)); break;
      case 'cc4': promiseArray.push(db.CC4.update(note, sourceWhere)); break;
      case 'cc5': promiseArray.push(db.CC5.update(note, sourceWhere)); break;
      case 'cc6': promiseArray.push(db.CC6.update(note, sourceWhere)); break;
      default: console.log("No source match found.");
    }

    Promise.all(promiseArray)
      .then(result => res.json(result))
      .catch(err => res.send(err));
  },

  deleteDetailRecord: function (req, res) {
    const { id, detail } = req.body;
    Help.updateDetailSource(req.user, req.body);

    const getDetails = (database) => {
      db[database].destroy({ where: { id: id } })
        .then(() => {
          db[database].findAll({ where: { UserId: req.user.id } })
            .then(data => res.json(data))
            .catch(err => res.send(err));
        });
    }

    switch (detail) {
      case 'detail1': getDetails('Detail1'); break;
      case 'detail2': getDetails('Detail2'); break;
      case 'detail3': getDetails('Detail3'); break;
      case 'detail4': getDetails('Detail4'); break;
      case 'detail5': getDetails('Detail5'); break;
      default: console.log("No detail match found.");
    }
  },

  deleteCheckingRecord: function (req, res) {
    const { id, income, amount } = req.body;
    Help.deleteDetail(req.user, req.body);
    db.Balance.findOne({ where: { UserId: req.user.id } })
      .then(bal => {
        const newBalance = bal.processDeleteChecking(amount, income);
        db.Balance.update(
          { checking: newBalance },
          { where: { UserId: req.user.id } }
        ).then(() => {
          db.Checking.destroy({ where: { id: id } })
            .then(() => {
              db.Checking.findAll({ where: { UserId: req.user.id } })
                .then(data => res.json(data))
                .catch(err => res.send(err));
            })
        })
      })
  },

  deleteCcRecord: function (req, res) {
    const { id, card } = req.body;
    Help.deleteDetail(req.user, req.body);
    Help.updateCCSpendAndBalance(req.user, req.body);

    const ccDestroy = function (database) {
      db[database].destroy({ where: { id: id } })
        .then(() => {
          db[database].findAll({ where: { UserId: req.user.id } })
            .then(data => res.json(data))
            .catch(err => res.send(err));
        })
    }

    switch (card) {
      case 'cc1': ccDestroy('CC1'); break;
      case 'cc2': ccDestroy('CC2'); break;
      case 'cc3': ccDestroy('CC3'); break;
      case 'cc4': ccDestroy('CC4'); break;
      case 'cc5': ccDestroy('CC5'); break;
      case 'cc6': ccDestroy('CC6'); break;
      default: console.log("No card match found.");
    }
  }

}