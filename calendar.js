var YEAR_START = 1970;
var YEAR_END = 2040;


/********************************* class Calendar created ***************************************/

class Calendar {
  constructor() {
    this.monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    this.dayNameNames = [
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
    ];

    this.yearSelector = document.getElementById('year');
    this.monthSelector = document.getElementById('month');

    this.years = [];
    this.months = [];
    this.dayNames = [];

    this.currentDate = new Date();
  }

  createYears() {
    var years = [];
    for (var year = YEAR_START; year <= YEAR_END; year++) {
      years.push(year);
    }

    var fragment = document.createDocumentFragment();

    years.forEach(function (year) {
      var option = document.createElement('option');
      option.value = year;
      option.innerText = year;

      this.years.push(option);
      fragment.appendChild(option);
    }.bind(this));

    this.yearSelector.appendChild(fragment);
  }

  createMonths() {
    var fragment = document.createDocumentFragment();

    this.monthNames.forEach(function (month, index) {
      var option = document.createElement('option');
      option.value = index;
      option.innerText = month;

      this.months.push(option);
      fragment.appendChild(option);
    }.bind(this));

    this.monthSelector.appendChild(fragment);
  }

  createDayNames() {
    var dayNames = document.getElementById('dayNames');
    var fragment = document.createDocumentFragment();

    this.dayNameNames.forEach(function (dayName, index) {
      var div = document.createElement('div');
      div.innerText = dayName;
      div.className = 'day-name';

      this.dayNames.push(div);
      fragment.appendChild(div);
    }.bind(this));


    dayNames.appendChild(fragment);
  }

  createDays() {
    var daysEl = document.getElementById('days');

    var days = [];

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 35; i++) {
      var day = document.createElement('div');
      day.innerText = i;
      day.className = 'day';
      days.push(day);

      fragment.appendChild(day);
    }

    daysEl.appendChild(fragment);
  }

  setDate() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();

    this.yearSelector.selectedIndex = currentYear - YEAR_START;
    this.monthSelector.selectedIndex = currentMonth;
  }

  setHandlers() {
    var prevButton = document.getElementById('prevArrow');
    var nextButton = document.getElementById('nextArrow');

    prevButton.addEventListener('click', function () {
      this.prev();
    }.bind(this));

    nextButton.addEventListener('click', function () {
      this.next();
    }.bind(this));

    this.yearSelector.addEventListener('change', function () {
      this.handleYearChange();
    }.bind(this));

    this.monthSelector.addEventListener('change', function () {
      this.handleMonthChange();
    }.bind(this));
  }

  init() {
    this.createYears();
    this.createMonths();
    this.createDayNames();
    this.createDays();

    this.setHandlers();

    this.setDate();
  }

  prev() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();

    if (currentYear === YEAR_START && currentMonth === 0) {
      return;
    }

    this.currentDate.setMonth(currentMonth - 1);
    this.setDate();
  }

  next() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();

    if (currentYear === YEAR_END && currentMonth === 11) {
      return;
    }

    this.currentDate.setMonth(currentMonth + 1);
    this.setDate();
  }

  handleYearChange() {
    var selectedYearIndex = this.yearSelector.selectedIndex;
    this.currentDate.setFullYear(selectedYearIndex + YEAR_START);
  }

  handleMonthChange() {
    var selectedMonthIndex = this.monthSelector.selectedIndex;
    this.currentDate.setMonth(selectedMonthIndex);
  }
}






document.addEventListener('DOMContentLoaded', function (event) {
  var calendar = new Calendar();
  calendar.init();   
    

    
    
  var form = document.getElementById('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log(form.color.value);
  })
});





















































/*******************************   "Select" clicked Changes    **********************************/

var select = document.getElementsByClassName('select-properties');
var changed = document.getElementById('calendar-body');


for (var i = 0; i < select.length; i++) {
    select[i].addEventListener('click', function (event) {
      event.stopPropagation();
      if (!changed.classList.contains('opacity-class')) {
          changed.classList.add('opacity-class');
      } else {
          changed.classList.remove('opacity-class');
      }
    });
};

window.addEventListener('click', function() {
  if (changed.classList.contains('opacity-class')) {
       changed.classList.remove('opacity-class');
  }
}); 


/*******************************   "Select" clicked Changes    **********************************/




