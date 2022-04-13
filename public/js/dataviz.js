// male and female users
var [ male, female ] = $('#chart1').data('gender');

const gender_data = {
    labels: ["Male", "Female"],
    datasets: [{
        label: 'Gender',
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(235, 200, 102)'],
        borderColor: 'rgb(201, 199, 200)',
        data: [male.sexCount, female.sexCount, 0],
    }]
};

const gender_config = {
    type: 'bar',
    data: gender_data,
    options: {
        scales: {
            y: {
              beginAtZero: true
            }
          }
    }
};

const gender_Chart = new Chart(
    $('#chart1'),
    gender_config
);


// read and unread messages
var { read, unread } = $('#chart2').data('messages')

const messages_data = {
    labels: [
      'Read',
      'Not Read',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [read, unread],
      backgroundColor: [
        '#e67e22',
        '#e74c3c',
      ],
      hoverOffset: 4
    }]
};

const messages_config = {
    type: 'doughnut',
    data: messages_data,
};

const messages_doghnut = new Chart(
    $('#chart2'),
    messages_config
);


// shipped and not shipped payed orders
var [ shipped, notshipped ] = $('#chart3').data("payed");

const payed_data = {
    labels: [
      'Item(s) Sent',
      'Item(s) not sent',
    ],
    datasets: [{
      label: 'Sent Items',
      data: [ shipped.status_shipment, notshipped.status_shipment ],
      backgroundColor: [
        '#2ecc71',
        '#2980b9',
      ],
      hoverOffset: 4
    }]
}

const payed_config = {
    type: 'pie',
    data: payed_data,
};

const payed_pie = new Chart(
    $('#chart3'),
    payed_config
);


// turnover 
const turnover = $("#chart4").data("turnover");
const turnover_labels = [ "Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const turnover_numbers = turnover_labels.map(month => 0);
for (let obj of turnover) {
    turnover_numbers[obj._id.month-1] = obj.monthlyTurnover;
}

const turnover_data = {
  labels: turnover_labels,
  datasets: [{
    label: 'My First Dataset',
    data: turnover_numbers,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const turnover_config = {
    type: 'line',
    data: turnover_data,
  };

const turnover_line = new Chart(
    $('#chart4'),
    turnover_config
)
