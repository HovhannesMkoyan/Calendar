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
    this.weekDnames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    this.yearSelector = document.getElementById('year');
    this.monthSelector = document.getElementById('month');
    this.dayNames = document.getElementById('dayNames');
      
    this.years = [];
    this.months = [];
    this.cells = [];
    this.dayNamesArray = [];
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

      this.dayNamesArray.push(div);
      fragment.appendChild(div);
    }.bind(this));


    dayNames.appendChild(fragment);
  }

    
/***************************************   createCells()   **************************************/
  createCells() {
    var daysContainer = document.getElementById('days-container');
    var fragmentDays = document.createDocumentFragment();
    for (var i = 1; i <= 42; i++) {
          var day = document.createElement('div');
          day.className = 'cell';
          this.cells.push(day);
          fragmentDays.appendChild(day);
    }
    daysContainer.appendChild(fragmentDays);
  } 
    

/********************************************   createDays()   ***********************************************/
  createDays() {
    var daysContainer = document.getElementById('days-container');
    var date1 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    var lengthOfMonth = date1.getDate(); // 28
    var weekDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay(), startingCell; 
    switch(weekDay) {
       case 0:
          startingCell = 6;
          break;
       case 1:
          startingCell = 0;
        break;
       case 2:
          startingCell = 1;
          break;
       case 3:
          startingCell = 2;
          break;
       case 4:
          startingCell = 3;
          break;
       case 5:
          startingCell = 4;
          break;
       case 6:
          startingCell = 5;
    }  
    var date = 1;
    for (var i = 0; i < 42; i++) {
        var day = daysContainer.children[i];
        if(i < startingCell) {
            day.innerText = "prev";
            day.classList.add('add-opacity');
        } else if (i >= (startingCell + lengthOfMonth)){
            day.innerText = "next";
            day.classList.add('add-opacity');
        } else {
            day.innerText = date;
            date++; 
            day.classList.remove('add-opacity');
        }
    }
  }
    
    
/********************************************   createPopUps()   *********************************************/
  createPopUps() {
    var daysContainer = document.getElementById('days-container');
    for (var i = 0; i < 42; i++) {
        var day = daysContainer.children[i];
        if (!isNaN(day.innerText)) {
            var popContainer = document.createElement('div');
            var popHeader = document.createElement('div');
            var popBody = document.createElement('div');
        }
     }
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
    this.createCells();
    this.createDays();
    this.createPopUps();
    this.setDate();
    this.setHandlers();
    this.highlightToday();
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
    this.createDays();
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
    this.createDays();
    this.createPopUps();
  }

    
/***************************************   handleYearChange()   *********************************/
  handleYearChange() {
    var selectedYearIndex = this.yearSelector.selectedIndex;
    this.currentDate.setFullYear(selectedYearIndex + YEAR_START);
    this.createDays();
  }
    
    
/***************************************   handleMonthChange()   ********************************/
  handleMonthChange() {
    var selectedMonthIndex = this.monthSelector.selectedIndex;
    this.currentDate.setMonth(selectedMonthIndex);
    this.createDays();
  }
    
    
/***************************************   highlightToday()   ***********************************/
  highlightToday() {
    var startingCell, date = new Date();
    function findStartingCell(array) {
        for(var i = 0; i < array.length; i++) {
            if (!isNaN(array[i].innerText)) {
                return array[i];
            }
        }
    }

    var startingCell = this.cells.indexOf(findStartingCell(this.cells));
    var todayNode = document.getElementById('days-container').children[startingCell + date.getDate() - 1].classList.add('highlightToday');
  }



/*********************************   highlightSat&SunColumns()   ********************************/
  highlightSatSun() {
      this.dayNames.children[5].classList.add('blue-color');
      this.dayNames.children[6].classList.add('red-color');
      for (var i = 0; i < 41; i++) {
           if ((i === 5 || i === 12 || i === 19 || i === 26 || i === 33 || i === 40) && 
              !isNaN(this.cells[i].innerText)) {
                      this.cells[i].classList.add('blue-color');
            } else if ((i === 6 || i === 13 || i === 20 || i === 27 || i === 34 || i === 41) && 
              !isNaN(this.cells[i].innerText)) {
                      this.cells[i].classList.add('red-color');
            } else {
                this.cells[i].style.color = 'black';
            }
      } 
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
