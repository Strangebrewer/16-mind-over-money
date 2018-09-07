const bCrypt = require('bcrypt-nodejs');

const tempPw = bCrypt.hashSync("1234", bCrypt.genSaltSync(10), null);

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: tempPw
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2018
    },
    month: {
      type: DataTypes.ENUM('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
      allowNull: false,
      defaultValue: 'Jan'
    },
    checking: {
      type: DataTypes.STRING,
      defaultValue: "Checking"
    },
    shelter: {
      type: DataTypes.STRING,
      defaultValue: "Housing"
    },
    util1: {
      type: DataTypes.STRING,
      defaultValue: "Utilities"
    },
    util2: DataTypes.STRING,
    util3: DataTypes.STRING,
    util4: DataTypes.STRING,
    util5: DataTypes.STRING,
    car: DataTypes.STRING,
    insurance: DataTypes.STRING,
    cc1: {
      type: DataTypes.STRING,
      defaultValue: "Credit Card"
    },
    cc2: DataTypes.STRING,
    cc3: DataTypes.STRING,
    cc4: DataTypes.STRING,
    cc5: DataTypes.STRING,
    cc6: DataTypes.STRING,
    cash: {
      type: DataTypes.STRING,
      defaultValue: "Cash"
    },
    detail1: {
      type: DataTypes.STRING,
      defaultValue: "Gas"
    },
    detail2: {
      type: DataTypes.STRING,
      defaultValue: "Food"
    },
    detail3: DataTypes.STRING,
    detail4: DataTypes.STRING,
    detail5: DataTypes.STRING,
    other1: DataTypes.STRING,
    other2: DataTypes.STRING,
    other3: DataTypes.STRING,
    savings1: {
      type: DataTypes.STRING,
      defaultValue: "Savings"
    },
    savings2: DataTypes.STRING,
    savings3: DataTypes.STRING,
    setup_names: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    setup_balances: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    nightmode: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  });

  User.associate = function (models) {
    User.hasOne(models.Balance);
    User.hasOne(models.CCSpend);
    User.hasOne(models.Note);
    User.hasMany(models.Expenses);
    User.hasMany(models.Checking);
    User.hasMany(models.CC1);
    User.hasMany(models.CC2);
    User.hasMany(models.CC3);
    User.hasMany(models.CC4);
    User.hasMany(models.CC5);
    User.hasMany(models.CC6);
    User.hasMany(models.Detail1);
    User.hasMany(models.Detail2);
    User.hasMany(models.Detail3);
    User.hasMany(models.Detail4);
    User.hasMany(models.Detail5);
  }

  return User;
}