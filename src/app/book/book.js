const { v4: uuidv4 } = require('uuid');

module.exports = {
  
  getBookList: async function getBookList(req) {
    try {
      const db = req.app.locals.db;
      const response = await db.collection('book').find({}).project({ _id: 0 }).toArray();
      return response;
    } catch (err) {
      console.error('Error while getBookList -: ', err);
      throw err;
    }
  },

  updateBook: async function updateBook(req) {
    try {
      const db = req.app.locals.db;
      const client = req.app.locals.dbClient;
      const data = req.body;
      const isBookIssued = data.operation == 'issue' ? true : false;

      const bookLogData = {
        uuid: uuidv4(),
        created_date_time: new Date(),
        book_uuid: data.book_uuid,
        book_name: data.book_name,
        operation: data.operation
      }
      // Can not use transaction due to mandatory replica set requirement from mongo
      await db.collection('book_transaction_log').insertOne(bookLogData);
      await db.collection('book').updateOne({ uuid: data.book_uuid },
        { $set: { is_book_issued: isBookIssued, modified_date_time: new Date() } });

      return true;
    } catch (err) {
      console.error('Error while updateBook -: ', err);
      throw err;
    }
  }

}