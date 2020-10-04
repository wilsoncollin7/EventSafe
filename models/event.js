module.exports = function (sequelize, DataTypes) {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'TBD',
      validate: {
        isDate: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'TBD',
      validate: {
        len: [1, 160]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    safety: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Event;
};
