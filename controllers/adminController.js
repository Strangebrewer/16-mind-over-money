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
    if (card === 'cc1') query = db.CC1.findAll({ where: { UserId: req.user.id } });
    if (card === 'cc2') query = db.CC2.findAll({ where: { UserId: req.user.id } });
    if (card === 'cc3') query = db.CC3.findAll({ where: { UserId: req.user.id } });
    if (card === 'cc4') query = db.CC4.findAll({ where: { UserId: req.user.id } });
    if (card === 'cc5') query = db.CC5.findAll({ where: { UserId: req.user.id } });
    if (card === 'cc6') query = db.CC6.findAll({ where: { UserId: req.user.id } });
    if (card === 'all') query = db.CCSpend.findAll({ where: { UserId: req.user.id } });
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
    if (category === 'detail1') query = db.Detail1.findAll({ where: { UserId: req.user.id } });
    if (category === 'detail2') query = db.Detail2.findAll({ where: { UserId: req.user.id } });
    if (category === 'detail3') query = db.Detail3.findAll({ where: { UserId: req.user.id } });
    if (category === 'detail4') query = db.Detail4.findAll({ where: { UserId: req.user.id } });
    if (category === 'detail5') query = db.Detail5.findAll({ where: { UserId: req.user.id } });
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

    if (source === 'checking') promiseArray.push(db.Checking.update(note, sourceWhere));
    if (source === 'cc1') promiseArray.push(db.CC1.update(note, sourceWhere));
    if (source === 'cc2') promiseArray.push(db.CC2.update(note, sourceWhere));
    if (source === 'cc3') promiseArray.push(db.CC3.update(note, sourceWhere));
    if (source === 'cc4') promiseArray.push(db.CC4.update(note, sourceWhere));
    if (source === 'cc5') promiseArray.push(db.CC5.update(note, sourceWhere));
    if (source === 'cc6') promiseArray.push(db.CC6.update(note, sourceWhere));
    if (category === 'detail1') promiseArray.push(db.Detail1.update(note, categoryWhere));
    if (category === 'detail2') promiseArray.push(db.Detail2.update(note, categoryWhere));
    if (category === 'detail3') promiseArray.push(db.Detail3.update(note, categoryWhere));
    if (category === 'detail4') promiseArray.push(db.Detail4.update(note, categoryWhere));
    if (category === 'detail5') promiseArray.push(db.Detail5.update(note, categoryWhere));
    
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

    if (detail === 'detail1') promiseArray.push(db.Detail1.update(note, detailWhere));
    if (detail === 'detail1') promiseArray.push(db.Detail1.update(note, detailWhere));
    if (detail === 'detail3') promiseArray.push(db.Detail3.update(note, detailWhere));
    if (detail === 'detail4') promiseArray.push(db.Detail4.update(note, detailWhere));
    if (detail === 'detail5') promiseArray.push(db.Detail5.update(note, detailWhere));
    if (source === 'checking') promiseArray.push(db.Checking.update(note, sourceWhere));
    if (source === 'cc1') promiseArray.push(db.CC1.update(note, sourceWhere));
    if (source === 'cc2') promiseArray.push(db.CC2.update(note, sourceWhere));
    if (source === 'cc3') promiseArray.push(db.CC3.update(note, sourceWhere));
    if (source === 'cc4') promiseArray.push(db.CC4.update(note, sourceWhere));
    if (source === 'cc5') promiseArray.push(db.CC5.update(note, sourceWhere));
    if (source === 'cc6') promiseArray.push(db.CC6.update(note, sourceWhere));

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

    if (detail === 'detail1') getDetails('Detail1');
    if (detail === 'detail2') getDetails('Detail2');
    if (detail === 'detail3') getDetails('Detail3');
    if (detail === 'detail4') getDetails('Detail4');
    if (detail === 'detail5') getDetails('Detail5');
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

    if (card === 'cc1') ccDestroy('CC1');
    if (card === 'cc2') ccDestroy('CC2');
    if (card === 'cc3') ccDestroy('CC3');
    if (card === 'cc4') ccDestroy('CC4');
    if (card === 'cc5') ccDestroy('CC5');
    if (card === 'cc6') ccDestroy('CC6');
  }

}