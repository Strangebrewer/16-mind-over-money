module.exports = function (sequelize, DataTypes) {
  const Note = sequelize.define("Note", {
    checking: DataTypes.TEXT,
    shelter: DataTypes.TEXT,
    util1: DataTypes.TEXT,
    util2: DataTypes.TEXT,
    util3: DataTypes.TEXT,
    util4: DataTypes.TEXT,
    util5: DataTypes.TEXT,
    car: DataTypes.TEXT,
    insurance: DataTypes.TEXT,
    cc1: DataTypes.TEXT,
    cc2: DataTypes.TEXT,
    cc3: DataTypes.TEXT,
    cc4: DataTypes.TEXT,
    cc5: DataTypes.TEXT,
    cc6: DataTypes.TEXT,
    detail1: DataTypes.TEXT,
    detail2: DataTypes.TEXT,
    detail3: DataTypes.TEXT,
    detail4: DataTypes.TEXT,
    detail5: DataTypes.TEXT,
    other1: DataTypes.TEXT,
    other2: DataTypes.TEXT,
    other3: DataTypes.TEXT,
    savings1: DataTypes.TEXT,
    savings2: DataTypes.TEXT,
    savings3: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
  });

  Note.associate = function (models) {
    Note.belongsTo(models.User);
  }

  return Note;
}