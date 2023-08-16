const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOperation;

//     if (this._id) {
//       // Update existing product;
//       dbOperation = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       // Insert new product
//       dbOperation = db.collection('products').insertOne(this);
//     }

//     return dbOperation
//       .then((result) => {
//         // console.log('DB Operation Result: ', result);
//         // console.log('Operation successful!');
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//   }

//   static findById(productId) {
//     const db = getDb();

//     return db
//       .collection('products')
//       .find({ _id: new ObjectId(productId) })
//       .next()
//   }

//   static deleteById(productId) {
//     const db = getDb();

//     return db
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(productId) });
//   }
// }

// module.exports = Product;
