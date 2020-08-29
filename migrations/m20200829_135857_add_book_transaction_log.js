module.exports = {
  async up(db) {

    await db.createCollection('book_transaction_log', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['uuid', 'book_uuid', 'created_date_time', 'book_name', 'operation'],
          properties: {
            uuid: {
              bsonType: 'string',
              description: 'uuid must be a string and is mandatory'
            },
            book_uuid: {
              bsonType: 'string',
              description: 'book_name must be a string and is mandatory'
            },
            book_name: {
              bsonType: 'string',
              description: 'book_name must be a string and is mandatory'
            },
            operation: {
              bsonType: 'string',
              description: 'operation must be a string and is mandatory'
            },
            created_date_time: {
              bsonType: 'date',
              description: 'created_date_time must be a datetime and is mandatory'
            }
          }
        }
      }
    });
    console.log('Created book_transaction_log collection with success.');

    const book_transaction_log = db.collection('book_transaction_log');

    await book_transaction_log.createIndex({ uuid: -1 }, { unique: true });
    console.log('Created index on book_transaction_log.uuid with success');

    await book_transaction_log.createIndex({ created_date_time: -1 });
    console.log('Created index on book_transaction_log.created_date_time with success');

    return true;
  },

  async down(db) {
    await db.dropCollection('book_transaction_log');
    console.log('Dropped collection book_transaction_log with success');
    return true;
  },
};