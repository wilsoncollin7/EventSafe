// Get references to page elements
const $eventText = $('#event-text');
const $eventDate = $('#event-date');
const $eventloc = $('#event-loc');
const $eventType = $('#event-type');
const $eventDescription = $('#event-description');
const $eventSafety = $('#event-safety');
const $submitBtn = $('#submit');
const $eventList = $('#event-list');

// The API object contains methods for each kind of request we'll make
const API = {
  saveEvent: function (event) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',

      url: 'api/events',
      data: JSON.stringify(event)
    });
  },
  getEvent: function () {
    return $.ajax({
      url: 'api/events',
      type: 'GET'
    });
  },
  deleteEvent: function (id) {
    return $.ajax({
      url: 'api/events/' + id,
      type: 'DELETE'
    });
  }
};

// refreshevents gets new events from the db and repopulates the list
const refreshEvents = function () {
  API.getEvent().then(function (data) {
    const $events = data.map(function (event) {
      const $a = $('<a>')
        .text(event.name)
        .attr('href', '/event/' + event.id);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',

          'data-id': event.id

        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $eventList.empty();
    $eventList.append($events);
  });
};

// handleFormSubmit is called whenever we submit a new event
// Save the new event to the db and refresh the list
const handleFormSubmit = function (event) {
  event.preventDefault();

  const events = {
    name: $eventText.val().trim(),
    date: $eventDate.val().trim(),
    location: $eventloc.val().trim(),
    type: $eventType.val().trim(),
    description: $eventDescription.val().trim(),
    safety: $eventSafety.val().trim(),
    UserId: window.userId
  };

  if (!(events.name && events.description)) {
    alert('You must enter an event text and description!');
    return;
  }
  API.saveEvent(events).then(function () {
    refreshEvents();
  });

  $eventText.val('');
  $eventDescription.val('');
};

// handleDeleteBtnClick is called when an event's delete button is clicked
// Remove the event from the db and refresh the list
const handleDeleteBtnClick = function () {
  const idToDelete = $(this).parent().attr('data-id');

  API.deleteEvent(idToDelete).then(function () {
    refreshEvents();
  });
};

refreshEvents();
// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);

$eventList.on('click', '.delete', handleDeleteBtnClick);

refreshEvents();
