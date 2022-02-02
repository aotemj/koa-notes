const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Goods = seq.define('goods', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.INTEGER
  }
})

// if the table is not exist, the table will be created by default
Goods.sync()

module.exports = Goods
