var YEAR_START = 1970;
var YEAR_END = 2040;


/********************************* class Calendar ***********************************************/
class Calendar {
  constructor() {
    this.monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    this.weekDaysNames = [
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
    ];

    this.yearSelector = document.getElementById('year');
    this.monthSelector = document.getElementById('month');
    this.dayNames = document.getElementById('dayNames');
      
    this.years = [];
    this.months = [];
    this.days = [];
    this.dayNames = [];
    
    this.currentDate = new Date();
  }

    
/***************************************   createYears()   **************************************/
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

    
/***************************************   createMonths()   *************************************/
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

    
/***************************************   createDayNames()   ***********************************/
  createDayNames() {
    var fragment = document.createDocumentFragment();

    this.weekDaysNames.forEach(function (dayName, index) {
      var div = document.createElement('div');
      div.innerText = dayName;
      div.className = 'day-name';

      this.dayNames.push(div);
      fragment.appendChild(div);
    }.bind(this));


    dayNames.appendChild(fragment);
  }

    
/***************************************   createDays()   ***************************************/
  createDays() {
    var daysEl = document.getElementById('days');
    var fragmentDays = document.createDocumentFragment();
      
    for (var i = 1; i <= 42; i++) {
      if (i < 32) {
          var day = document.createElement('div');
          day.innerText = i;
          day.className = 'day';
          this.days.push(day);
          fragmentDays.appendChild(day);
      } else {
          var day = document.createElement('div');
          day.innerText = "?";
          day.className = 'day';
          this.days.push(day);
          fragmentDays.appendChild(day);
      }
    }

    daysEl.appendChild(fragmentDays);
  }   

/***************************************   setDate()  *******************************************/
  setDate() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();
      
    this.yearSelector.selectedIndex = currentYear - YEAR_START;
    this.monthSelector.selectedIndex = currentMonth;
  }

    
/***********************************   setHandlers()   ******************************************/
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
    
    
/***************************************   init()   *********************************************/
  init() {
    this.createYears();
    this.createMonths();
    this.createDayNames();
    this.createDays();
    this.setDate();
    this.setHandlers();
    this.highlightToday();
    this.handleDaysPosition();
    this.highlightSatSun();
  }

/***************************************   prev()   *********************************************/
  prev() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();

    if (currentYear === YEAR_START && currentMonth === 0) {
      return;
    }

    this.currentDate.setMonth(currentMonth - 1);
    this.setDate();
  }
    

/***************************************   next()   *********************************************/
  next() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();

    if (currentYear === YEAR_END && currentMonth === 11) {
      return;
    }

    this.currentDate.setMonth(currentMonth + 1);
    this.setDate();
  }

    
/***************************************   handleYearChange()   *********************************/
  handleYearChange() {
    var selectedYearIndex = this.yearSelector.selectedIndex;
    this.currentDate.setFullYear(selectedYearIndex + YEAR_START);
  }
    
    
/***************************************   handleMonthChange()   ********************************/
  handleMonthChange() {
    var selectedMonthIndex = this.monthSelector.selectedIndex;
    this.currentDate.setMonth(selectedMonthIndex);
  }
    
    
/**************************************   handleDaysPosition()   ********************************/
  handleDaysPosition() {
    var todayName = this.currentDate.getDay();
    console.log((todayName));
  }
    
    
/***************************************   highlightToday()   ***********************************/
  highlightToday() {
      var today = this.currentDate.getDate();
      var todayNode = document.getElementById('days').childNodes[today - 1];
      todayNode.classList.add('highlightToday');
  }



/*************************************   highlightSat&Sun()   ***********************************/
  highlightSatSun() {
      var sat = this.dayNames[5];
      var sun = this.dayNames[6];
      sat.classList.add('satColor');
      sun.classList.add('sunColor');
  }
    
    
    
}

/***************************************   new Calendar()  **************************************/

document.addEventListener('DOMContentLoaded', function (event) {
  var calendar = new Calendar();
  calendar.init();   
});




/*******************************   "Select" clicked Changes    **********************************/

var select = document.getElementsByClassName('select-properties');
var changed = document.getElementById('calendar-body');

for (var i = 0; i < select.length; i++) {
    select[i].addEventListener('click', function (event) {
      event.stopPropagation();
      if (!changed.classList.contains('opacity-class')) {
          console.log('select selected');
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

