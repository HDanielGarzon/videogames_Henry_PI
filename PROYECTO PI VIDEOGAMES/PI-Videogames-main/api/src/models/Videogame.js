const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const videogame = sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      released: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
        },
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return videogame;
};
