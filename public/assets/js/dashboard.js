// Get references to page elements
const $eventList = $('#event-list');

// The API object contains methods for each kind of request we'll make
const API = {
  getEvent: function () {
    return $.ajax({
      url: 'api/events',
      type: 'GET'
    });
  }
};

// refreshevents gets new events from the db and repopulates the list
const refreshEvents = function () {
  API.getEvent().then(function (data) {
    const $events = data.map(function (event) {
      const $cardHeader = $('<div>').text(event.name).addClass('card-header event-header');
      const $cardTitle = $('<h5>').text(event.date + ' | ' + event.location + ' | ' + event.type).addClass('card-title');
      const $cardText = $('<p>').text(event.description).addClass('card-text');
      const $cardLink = $('<a>').text('See more...').attr('href', '/event/' + event.id).addClass('btn btn-primary');

      const $cardBody = $('<div>').addClass('card-body').append($cardTitle).append($cardText).append($cardLink);

      const $div = $('<div>')
        .attr({
          class: 'list-group-item card event-cards mt-4 mb-4',

          'data-id': event.id

        }).append($cardHeader).append($cardBody);

      return $div;
    });

    $eventList.empty();
    $eventList.append($events);
  });
};

refreshEvents();
