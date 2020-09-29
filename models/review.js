module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
  });

  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Review.associate = function (models) {
    Review.belongsTo(models.Business, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Review;
};
