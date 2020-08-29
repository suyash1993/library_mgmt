module.exports = {
  async up(db) {
    await db.collection('book').bulkWrite(
      [
        {
          insertOne:
            {
              "document":
                {
                  "_id": 1,
                  "uuid": "1",
                  "book_name": "harry potter",
                  "author": "J K rowling",
                  "is_book_issued": false,
                  "created_date_time": new Date("2012-12-19T06:01:17.171Z")

                }
            }
        },
        {
          insertOne:
            {
              "document":
                {
                  "_id": 2,
                  "uuid": "2",
                  "book_name": "Game of thrones",
                  "author": "George Martin",
                  "is_book_issued": false,
                  "created_date_time": new Date("2012-12-19T06:01:17.171Z")

                }
            }
        },
        {
          insertOne:
            {
              "document":
                {
                  "_id": 3,
                  "uuid": "3",
                  "book_name": "The Alchemist",
                  "author": "Paulo Cohelo",
                  "is_book_issued": true,
                  "created_date_time": new Date("2012-12-19T06:01:17.171Z")

                }
            }
        },
        {
          insertOne:
            {
              "document":
                {
                  "_id": 4,
                  "uuid": "4",
                  "book_name": "Shala",
                  "author": "Milind Bokil",
                  "is_book_issued": false,
                  "created_date_time": new Date("2012-12-19T06:01:17.171Z")

                }
            }
        },
        {
          insertOne:
            {
              "document":
                {
                  "_id": 5,
                  "uuid": "5",
                  "book_name": "Mrutunjay",
                  "author": "shivaji sawant",
                  "is_book_issued": false,
                  "created_date_time": new Date("2012-12-19T06:01:17.171Z")

                }
            }
        },
        {
          insertOne:
            {
              "document":
                {
                  "_id": 6,
                  "uuid": "6",
                  "book_name": "A suitable boy",
                  "author": "Vikram seth",
                  "is_book_issued": false,
                  "created_date_time": new Date("2012-12-19T06:01:17.171Z")

                }
            }
        },
        {
          insertOne:
            {
              "document":
                {
                  "_id": 7,
                  "uuid": "7",
                  "book_name": "Rich Dad Poor Dad",
                  "author": "Robert kyowoski",
                  "is_book_issued": false,
                  "created_date_time": new Date("2012-12-19T06:01:17.171Z")

                }
            }
        }
      ]
    );
    return true;
  },

  async down(db) {
    return true;
  },
};