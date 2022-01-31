const Goods = require('../models/goods.model')

class GoodsServices {
  async createGoods ({ name, image, count, price }) {
    const goods = await Goods.create({
      name,
      image,
      count,
      price
    })

    return goods?.dataValues
  }
}

module.exports = new GoodsServices()
