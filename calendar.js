var YEAR_START = 1970;
var YEAR_END = 2040;


/**************************************    class Calendar    *************************************************/
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
    this.popups = [];
    this.currentDate = new Date();
  }

    
/*********************************************   createYears()   *********************************************/
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

    
/***********************************************   createMonths()   ******************************************/
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

    
/**********************************************   createDayNames()   *****************************************/
  createDayNames() {
    var fragment = document.createDocumentFragment();
    this.weekDaysNames.forEach(function (dayName, index) {
      var div = document.createElement('div');
      div.innerText = dayName;
      div.className = 'day-name';
      fragment.appendChild(div);
    }.bind(this));
    dayNames.appendChild(fragment);
  }

    
/**********************************************   createCells()   ********************************************/
  createCells() {
    var daysContainer = document.getElementById('days-container');
    var fragmentDays = document.createDocumentFragment();
    for (var i = 1; i <= 42; i++) {
          var cell = document.createElement('div');
          cell.className = 'cell';
          this.cells.push(cell);
          fragmentDays.appendChild(cell);
    }
    daysContainer.appendChild(fragmentDays);
  } 
    

/********************************************   createDays()   ***********************************************/
  createDays() {
    var daysContainer = document.getElementById('days-container');
    var date1 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    var lengthOfMonth = date1.getDate(); // 28
    var weekDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
    var startingCell;
    switch (weekDay) {
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
        if (i < startingCell) {
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

    
/***************************************   createPopUps()  *******************************************/

  createPopUps() {
      for (var i = 0; i < 42; i++) {
         if (!isNaN((this.cells[i]).innerText)) {
            var popContainer = document.createElement('div'), containerFragment = document.createDocumentFragment();
            popContainer.classList.add('pop-container');
            
               var popHeader = document.createElement('div'),  headerFragment = document.createDocumentFragment();
               popHeader.classList.add('pop-header');
                  var heading = document.createElement('h1');
                  heading.innerText = 'Todo List';
                  heading.classList.add('heading');
                  headerFragment.appendChild(heading);
                  var closeButton = document.createElement('img');
                  closeButton.src = 'close.png';
                  closeButton.classList.add('close-button');   
                  headerFragment.appendChild(closeButton);
               popHeader.appendChild(headerFragment);
            containerFragment.appendChild(popHeader);
            
               var popBody = document.createElement('div');
               popBody.id = 'pop-body';
            containerFragment.appendChild(popBody);
            
               var popBottom = document.createElement('div'), bottomFragment = document.createDocumentFragment();
               popBottom.classList.add('pop-bottom');
                  var timeInput = document.createElement('input');
                  timeInput.placeholder = 'time';
                  timeInput.classList.add('time-input');
                  timeInput.id = 'time-input';
                  bottomFragment.appendChild(timeInput);
                  var taskInput = document.createElement('input');
                  taskInput.placeholder = 'todo';
                  taskInput.classList.add('task-input');
                  taskInput.id = 'task-input';
                  bottomFragment.appendChild(taskInput);
                  var add = document.createElement('img');
                  add.src = 'add.png';
                  add.classList.add('addIcon');
                  add.id = 'addIcon';
                  bottomFragment.appendChild(add);
               popBottom.appendChild(bottomFragment);
            this.popups.push(popContainer);
            containerFragment.appendChild(popBottom);
        
            popContainer.appendChild(containerFragment);
            document.getElementById('popups-container').appendChild(popContainer);
         }
      }
        function findStartingCell(array) {
            for(var i = 0; i < array.length; i++) {
                if (!isNaN(array[i].innerText)) {
                    return array[i];
                }
            }
        }
        var startingCell = this.cells.indexOf(findStartingCell(this.cells));
        for (var i = 0; i < 42; i++) {
            if (!isNaN((this.cells[i]).innerText)) {
                var self = this;
                var popupForThisDay = document.getElementById('popups-container').children[i];
                this.cells[i].addEventListener('click', function() {
                    popupForThisDay[4].style.display = 'block'
                }); 
  
                closeButton.addEventListener('click', function() {
                    popupForThisDay.style.display = 'none';
                });
                
                window.addEventListener('click', function(event) {
                    if (event.target === closeButton) {
                        popupForThisDay.style.display = 'none';
                    }
                }); 
            }
        } 

        
        document.getElementById('addIcon').addEventListener('click', function(event) {
            var timeValue = document.getElementById('time-input').value;
            var taskValue = document.getElementById('task-input').value;
            if (timeValue !== "" && taskValue !== "") {
                var task = document.createElement('div'), fragment = document.createDocumentFragment();
                task.classList.add('task');
                task.innerText = timeValue + ' - ' + taskValue;
                var doneIcon = document.createElement('img');
                doneIcon.src = 'done.png';
                var deleteIcon = document.createElement('img');
                deleteIcon.src = 'delete.png';
                var editIcon = document.createElement('img');
                editIcon.src = 'edit.png';
                fragment.appendChild(task);
                fragment.appendChild(doneIcon);
                fragment.appendChild(deleteIcon);
                fragment.appendChild(editIcon);
                popupForThisDay.children[1].appendChild(fragment);
            }
        });
  }
    
    
/**********************************************   setDate()  *************************************************/
  setDate() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();
    this.yearSelector.selectedIndex = currentYear - YEAR_START;
    this.monthSelector.selectedIndex = currentMonth;
  }

    
/********************************************   setHandlers()   **********************************************/
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
    
    
/**********************************************   init()   ***************************************************/
  init() {
    this.createYears();
    this.createMonths();
    this.createDayNames();
    this.createCells();
    this.createDays();
    this.setDate();
    this.setHandlers();
    this.highlightToday();
    this.highlightSatSun();
  }

    
/**********************************************   prev()   ***************************************************/
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
    

/**********************************************   next()   ***************************************************/
  next() {
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth();

    if (currentYear === YEAR_END && currentMonth === 11) {
      return;
    }
    this.currentDate.setMonth(currentMonth + 1);
    this.setDate();
    this.createDays();
    this.highlightToday()
  }

    
/**********************************************   handleYearChange()   ***************************************/
  handleYearChange() {
    var selectedYearIndex = this.yearSelector.selectedIndex;
    this.currentDate.setFullYear(selectedYearIndex + YEAR_START);
    this.createDays();
  }
    
    
/********************************************   handleMonthChange()   ****************************************/
  handleMonthChange() {
    var selectedMonthIndex = this.monthSelector.selectedIndex;
    this.currentDate.setMonth(selectedMonthIndex);
    this.createDays();
  }
    
    
/*******************************************   highlightToday()   ********************************************/
  highlightToday() {
    var date = new Date();
    function findStartingCell(array) {
        for (var i = 0; i < array.length; i++) {
            if (!isNaN(array[i].innerText)) {
                return array[i];
            }
        }
    }
      
    var startingCell = this.cells.indexOf(findStartingCell(this.cells));
    var todayNode = document.getElementById('days-container').children[startingCell + date.getDate() - 1];
    if ( date.getMonth() === Number(this.currentDate.getMonth()) ) {
        todayNode.classList.add('highlightToday');
    } else {
        todayNode.classList.remove('highlightToday');
    }
  }


/*******************************************   highlightSatSun()   *******************************************/
  highlightSatSun() {
      this.dayNames.children[5].classList.add('blue-color');
      this.dayNames.children[6].classList.add('red-color');
      for (var i = 0; i < 42; i++) {
            if (i === 5 || i === 12 || i === 19 || i === 26 || i === 33 || i === 40) {
                this.cells[i].classList.add('blue-color');
            } else if (i === 6 || i === 13 || i === 20 || i === 27 || i === 34 || i === 41) {
                this.cells[i].classList.add('red-color');
            } else {
                this.cells[i].style.color = 'black';
            }
      } 
  }
    
    
} // end of class


/********************************************   new Calendar()  **********************************************/
document.addEventListener('DOMContentLoaded', function (event) {
  var calendar = new Calendar();
  calendar.init();   
});


/*****************************************   "select" click Changes    ***************************************/

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
