const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const genres = sequelize.define(
    "genres",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return genres;
};
