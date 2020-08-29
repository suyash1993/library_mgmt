$(document).ready(function () {
  listBooks();
  registerGlobalButtonEvent();
});

function registerGlobalButtonEvent(){
  $('#book-list').on('click', function () {
    listBooks();
  });

  $('#book-log').on('click', function () {
    listBookTransactionLog();
  });
};

function listBooks() {
  $.ajax({
    url: 'book/list', success: function (result) {
      let html = `<table class='table table-condensed'>
    <thead>
      <tr>
        <th>Id</th>
        <th>Book Name</th>
        <th>Author</th>
        <th>Is Available</th>
        <th>Operation</th>
      </tr>
    </thead><tbody>`
      for (const row of result) {
        if (row.is_book_issued) {
          html += getBookListRow(row, 'data-book-return', 'Return', 'danger');
        } else {
          html += getBookListRow(row, 'data-book-issue', 'Issue', 'success')
        }
      }
      html += `</tbody>`
      $('#app').html(html);
      registerBookTransactionEvent();
    }
  });

};

function getBookListRow(row, className, buttonText, buttonClass) {
  return `<tr>
      <td>${row.uuid}</td>
      <td>${row.book_name}</td>
      <td>${row.author}</td>
      <td>${row.is_book_issued}</td>
      <td>
        <button type='button' data-book-uuid='${row.uuid}' data-book-name='${row.book_name}' class='${className} btn btn-${buttonClass} btn-sm'>${buttonText}</button>
      </td>
  </tr>`;
};


function listBookTransactionLog() {
  $.ajax({
    url: 'bookTransactionLog/list', success: function (result) {
      let html = `<table class='table table-condensed'>
    <thead>
      <tr>
        <th>Book Name</th>
        <th>Issue Date Time</th>
      </tr>
    </thead><tbody>`
      for (const row of result) {
        html += `<tr>
          <td>${row.book_name}</td>
          <td>${row.created_date_time}</td>
        </tr>`
      }
      html += `</tbody>`
      $('#app').html(html);
    }
  });
};

function registerBookTransactionEvent() {
  $('.data-book-issue').on('click', function () {
    initOperation(this);
  });
  $('.data-book-return').on('click', function () {
    initOperation(this);
  });
};

function initOperation(buttonThis) {
  const data = {
    book_uuid: $(buttonThis).attr('data-book-uuid'),
    book_name: $(buttonThis).attr('data-book-name'),
    operation: $(buttonThis).text().toLowerCase()
  };
  $.ajax({
    url: 'book', type: 'PUT', data:data, 
    success: function (result) {
      window.location.reload();
    }
  });
}