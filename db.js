const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acmeInventory');

const Product = conn.define('product', {
    name: Sequelize.STRING,
    status: {
        type: Sequelize.ENUM('in stock', 'backordered', 'discontinued'),
        defaultValue: 'in stock'
      }
});

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    const productNames = ['Stupid', 'Water Bottle', 'Dinner'];
    const Items = await Promise.all(productNames.map(name => Product.create({ name})));

  };

//syncAndSeed();

module.exports = {
    Product,
    syncAndSeed
};