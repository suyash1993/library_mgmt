const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

module.exports = {

  getBookTransactionLogList: async function getBookTransactionLogList(req) {
    try {
      const db = req.app.locals.db;
      const lastMonthDate = moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }).subtract(30, 'd')
      const filter = { created_date_time: { '$gte': new Date(lastMonthDate) }, operation: 'issue' };
      const response = await db.collection('book_transaction_log').find(filter).project({ _id: 0 }).toArray();
      return response;
    } catch (err) {
      console.error('Error while getBookTransactionLogList -: ', err);
      throw err;
    }
  }
}