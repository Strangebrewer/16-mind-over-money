module.exports = function (sequelize, DataTypes) {
  const CC1 = sequelize.define("CC1", {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.ENUM('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
      allowNull: false
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    payment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    amount: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: false
    },
    category:DataTypes.STRING,
    description:DataTypes.TEXT,
    note:DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  });

  CC1.associate = function (models) {
    CC1.belongsTo(models.User);
  }

  return CC1;
}