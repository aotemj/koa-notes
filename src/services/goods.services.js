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

  async getGoodsInfo (goodsId) {
    const goods = await Goods.findOne({
      attributes: ['id', 'price', 'name', 'count', 'image'],
      where: {
        id: goodsId
      }
    })
    return goods || null
  }

  async updateGoods ({ goodsId, params }) {
    await Goods.update({
      ...params
    })
    await Goods.save()
  }
}

module.exports = new GoodsServices()
