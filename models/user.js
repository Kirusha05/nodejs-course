const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

userSchema.methods.addToCart = function (product) {
  // Check if product exists already in the cart
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  const updatedCart = {
    items: updatedCartItems
  };

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

// const { ObjectId } = require('mongodb');

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart || { items: [] };
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(product) {
//     const db = getDb();

//     // Check if product exists already in the cart
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });

//     if (cartProductIndex >= 0) {
//       // Increase the quantity if the product if it is already in the cart and return
//       return db
//         .collection('users')
//         .updateOne(
//           { _id: this._id, 'cart.items.productId': product._id },
//           { $inc: { 'cart.items.$.quantity': 1 } }
//         );
//     }

//     // Otherwise, add a new product to the cart if it's not there
//     this.cart.items.push({ productId: product._id, quantity: 1 });

//     return db
//       .collection('users')
//       .updateOne({ _id: this._id }, { $set: { cart: this.cart } });
//   }

//   getCart() {
//     const db = getDb();

//     const productIds = this.cart.items.map((item) => item.productId);
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         const productsWithQuantity = products.map((product) => {
//           const productQuantity = this.cart.items.find(
//             (item) => item.productId.toString() === product._id.toString()
//           ).quantity;
//           return { ...product, quantity: productQuantity };
//         });
//         return productsWithQuantity;
//       });
//   }

//   deleteItemFromCart(productId) {
//     const db = getDb();

//     const updatedCartItems = this.cart.items.filter(
//       (item) => item.productId.toString() !== productId
//     );
//     const updatedCart = { items: updatedCartItems };

//     return db
//       .collection('users')
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   addOrder() {
//     const db = getDb();

//     return this.getCart()
//       .then((cartProducts) => {
//         const order = {
//           items: cartProducts,
//           user: {
//             _id: this._id,
//             name: this.name
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then((result) => {
//         return db
//           .collection('users')
//           .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//       });
//   }

//   getOrders() {
//     const db = getDb();

//     return db.collection('orders').find({ 'user._id': this._id }).toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db.collection('users').findOne({ _id: new ObjectId(userId) });
//   }
// }

// module.exports = User;
