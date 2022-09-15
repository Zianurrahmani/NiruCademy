'use strict';
const {
  Model
} = require('sequelize')
const bcrypt = require('bcryptjs')
const toonavatar = require('cartoon-avatar')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Course)
    }
    static hello(){
      return `Hello, ${this.name}!`
    }
    welcomeUser(){
      return `Let's begin your journey today!` 
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty'
        }
      }
    },
    username:  {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'username cannot be empty'
        }
      }
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty'
        },
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty',
        },
        len : [5,10]
      }
    },
    CourseId: DataTypes.INTEGER,
    profileImg: DataTypes.STRING,
    coin: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'role cannot be empty'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'please check what is your gender'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash,
        instance.coin = 100,
        instance.profileImg = toonavatar.generate_avatar({"gender": instance.gender})
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};