'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A first name is required."
        },
        notEmpty: {
          msg: "Please provide a first name."
        }
      }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is required."
          },
          notEmpty: {
            msg: "Please provide a last name."
          }
        }
      },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email you entered is already in use.'
      },
      validate: {
        notNull: {
          msg: "An email is required."
        },
        isEmail: {
          msg: "Please provide a valid email."
        }
      }
    },
    password: {
      type: DataTypes.STRING,  
      allowNull: false,
      validate: {
        notNull: {
          msg: "A password is required."
        },
        notEmpty: {
          msg: "Please provide a password."
        }
      },
      set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
      },
    },
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, { 
      as: "user",
      foreignKey: { 
        fieldName: 'userId',
        allowNull: false,
      } 
    });
  };

  return User;
};