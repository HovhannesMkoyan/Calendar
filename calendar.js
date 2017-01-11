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

    
/********************************************   createPopUps()  **********************************************/
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
                  add.classList.add('add-icon');
                  add.id = 'add-icon';
                  bottomFragment.appendChild(add);
               popBottom.appendChild(bottomFragment);
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
      
      
      // Code for day-click-popup is below, but it doesn't work
      // Error - 'Cannot read property 'classList' of undefined'
      // However to see the pop up, one can activate .pop-container:first-child from css file :)
      
        /*var startingCell = this.cells.indexOf(findStartingCell(this.cells));
        for (var i = 0; i < 42; i++) {
            var popupForClickedDay = document.getElementById('popups-container').children[i];
            if (!isNaN((this.cells[i]).innerText)) {
                console.log(document.getElementById('popups-container'));
                this.cells[i].addEventListener('click', function() {
                    popupForClickedDay.classList.add('display-block');
                }); 
  
                closeButton.addEventListener('click', function() {
                    popupForClickedDay.classList.remove('display-block');
                });
                
                window.addEventListener('click', function(event) {
                    if (event.target === closeButton) {
                        popupForClickedDay.classList.remove('display-block');
                    }
                }); 
            }
        } */

        document.getElementById('add-icon').addEventListener('click', function(event) {
            var timeValue = document.getElementById('time-input').value;
            var taskValue = document.getElementById('task-input').value;
            var taskFragment = document.createDocumentFragment();
            if (timeValue !== "" && taskValue !== "" ) {
                var taskContainer = document.createElement('input');
                taskContainer.classList.add('task-container');
                taskContainer.value = timeValue + ' - ' + taskValue;
                taskContainer.disabled = true;
                var doneIcon = document.createElement('img');
                doneIcon.src = 'done.png';
                doneIcon.id = 'done-icon';
                doneIcon.classList.add('icons');
                var deleteIcon = document.createElement('img');
                deleteIcon.src = 'delete.png';
                deleteIcon.id = 'delete-icon';
                deleteIcon.classList.add('icons');
                var editIcon = document.createElement('img');
                editIcon.src = 'edit.png';
                editIcon.id = 'edit-icon';
                editIcon.classList.add('icons');
                taskFragment.appendChild(taskContainer);
                taskFragment.appendChild(doneIcon);
                taskFragment.appendChild(deleteIcon);
                taskFragment.appendChild(editIcon);
            }
            document.getElementById('pop-body').appendChild(taskFragment);
        });
        
            var done = document.getElementById('add-icon');
            done.addEventListener('mouseover', function(event) {
                done.src = 'add-hover.png'
            });
            done.addEventListener('mouseout', function(event) {
                done.src = 'add.png'
            });

            document.addEventListener('DOMContentLoaded', function () {
                var edit = document.getElementById('edit-icon');
                edit.addEventListener('mouseover', function(event) {
                     edit.src = 'edit-hover.png'
                });
                document.getElementById('edit-icon').addEventListener('mouseout', function(event) {
                     edit.src = 'edit.png'
                });

                var done = document.getElementById('edit-icon');
                done.addEventListener('mouseover', function(event) {
                     done.src = 'done-hover.png'
                });
                document.getElementById('edit-icon').addEventListener('mouseout', function(event) {
                     done.src = 'done.png'
                });

                var del = document.getElementById('edit-icon');
                del.addEventListener('mouseover', function(event) {
                     del.src = 'delete-hover.png'
                });
                document.getElementById('edit-icon').addEventListener('mouseout', function(event) {
                     del.src = 'del.png'
                });
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
    this.createPopUps();
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
