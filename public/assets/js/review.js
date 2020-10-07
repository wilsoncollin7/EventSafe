// Get references to page elements
const $reviewTitle = $('#review-title');
const $reviewDescription = $('#review-description');
const $reviewDate = $('#review-date');
const $reviewLocation = $('#review-loc');
const $reviewType = $('#review-type');
const $submitBtn = $('#submit');
const $reviewList = $('#review-list');

// The API object contains methods for each kind of request we'll make
const API = {
  saveReview: function (review) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',

      url: 'api/reviews',
      data: JSON.stringify(review)
    });
  },
  getReview: function () {
    return $.ajax({
      url: 'api/reviews',
      type: 'GET'
    });
  },
  deleteReview: function (id) {
    return $.ajax({
      url: 'api/reviews/' + id,
      type: 'DELETE'
    });
  }
};

// refresh reviews gets new reviews from the db and repopulates the list
const refreshReview = function () {
  API.getReview().then(function (data) {
    const $reviews = data.map(function (review) {
      const $a = $('<a>')
        .text(review.title)
        .attr('href', '/review/' + review.id);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',

          'data-id': review.id

        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $reviewList.empty();
    $reviewList.append($reviews);
  });
};

// handleFormSubmit is called whenever we submit a new review
// Save the new review to the db and refresh the list
const handleFormSubmit = function (review) {
  review.preventDefault();

  const reviews = {
    title: $reviewTitle.val().trim(),
    date: $reviewDate.val(),
    location: $reviewLocation.val().trim(),
    type: $reviewType.val().trim(),
    description: $reviewDescription.val().trim(),
    UserId: window.userId
  };

  if (!(reviews.title && reviews.description)) {
    alert('You must enter an review text and description!');
    return;
  }
  if (!(reviews.location)) {
    alert('You must enter a location!');
    return;
  }
  API.saveReview(reviews).then(function () {
    refreshReview();
  });

  $reviewTitle.val('');
  $reviewDescription.val('');
  $reviewDate.val('');
  $reviewType.val('');
  $reviewLocation.val('');
};

// handleDeleteBtnClick is called when an review's delete button is clicked
// Remove the review from the db and refresh the list
const handleDeleteBtnClick = function () {
  const idToDelete = $(this).parent().attr('data-id');

  API.deleteReview(idToDelete).then(function () {
    refreshReview();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);

$reviewList.on('click', '.delete', handleDeleteBtnClick);
