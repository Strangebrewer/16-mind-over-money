module.exports = function (sequelize, DataTypes) {
  const CCSpend = sequelize.define("CCSpend", {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.ENUM('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
      allowNull: false
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

  CCSpend.associate = function (models) {
    CCSpend.belongsTo(models.User);
  }

  return CCSpend;
}