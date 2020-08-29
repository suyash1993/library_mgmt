module.exports = {
  async up(db) {

    await db.createCollection('book', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['uuid', 'created_date_time', 'book_name', 'author'],
          properties: {
            uuid: {
              bsonType: 'string',
              description: 'uuid must be a string and is mandatory'
            },
            book_name: {
              bsonType: 'string',
              description: 'book_name must be a string and is mandatory'
            },
            author: {
              bsonType: 'string',
              description: 'author_name must be a string and is mandatory'
            },
            is_book_issued: {
              bsonType: 'bool',
              description: 'is_book_issued must be a boolean'
            },
            created_date_time: {
              bsonType: 'date',
              description: 'created_date_time must be a datetime and is mandatory'
            },
            modified_date_time: {
              bsonType: 'date',
              description: 'modified_date_time must be a datetime'
            },
          }
        }
      }
    });
    console.log('Created collection with book collection with success.');

    const book = db.collection('book');

    await book.createIndex({ uuid: -1 }, { unique: true });
    console.log('Created index on book.uuid with success');

    return true;
  },

  async down(db) {
    await db.dropCollection('book');
    console.log('Dropped collection book with success');
    return true;
  },
};