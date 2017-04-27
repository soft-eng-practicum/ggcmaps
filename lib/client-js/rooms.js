// Buildings Floor Files
var campus = 'Building/(Campus)/campus.html';
var building2 = ['Building/2000/First-Floor.html'];
var building3 = ['Building/3000/First-Floor.html', 'Building/3000/Second-Floor.html', 'Building/3000/Third-Floor.html', 'Building/3000/Fourth-Floor.html'];
var buildingA = ['Building/A/First-Floor.html'];
var buildingB = ['Building/B/first-floor.html', 'Building/B/second-floor.html', 'Building/B/third-floor.html'];
var buildingC = ['Building/C/First-Floor.html', 'Building/C/Second-Floor.html'];
var buildingC3 = ['Building/C3/Ground-Floor.html', 'Building/C3/First-Floor.html', 'Building/C3/Second-Floor.html'];
var buildingD = ['Building/D/First-Floor.html', 'Building/D/Second-Floor.html'];
var buildingE = ['Building/E/First-Floor.html', 'Building/E/Second-Floor.html', 'Building/E/Third-Floor.html'];
var buildingF = ['Building/F/First-Floor.html', 'Building/F/Second-Floor.html'];
var buildingH = ['Building/H/First-Floor.html', 'Building/H/Second-Floor.html', 'Building/H/Third-Floor.html'];
var buildingI = ['Building/I/First-Floor.html', 'Building/I/Second-Floor.html', 'Building/I/Third-Floor.html'];
var buildingL = ['Building/L/First-Floor.html', 'Building/L/Second-Floor.html', 'Building/L/Third-Floor.html'];

// Floors Numbers
var floors2 = ['1'];
var floors3 = ['1', '2', '3', '4'];
var floorsA = ['1'];
var floorsB = ['1', '2', '3'];
var floorsC = ['1', '2'];
var floorsC3 = ['G', '1', '2'];
var floorsD = ['1', '2'];
var floorsE = ['1', '2', '3'];
var floorsF = ['1', '2'];
var floorsH = ['1', '2', '3'];
var floorsI = ['1', '2', '3'];
var floorsL = ['1', '2', '3'];

// JSON file for room names
var roomNameFile = 'js/roomNames.json';
// JSON of room names
var roomNames;

// Help Documentation
var helpFile = 'help.html';
// Developed By
var devFile = 'devs.html';

// Hiding the element or not
var HIDE = true;
var SHOW = false;

// Timeout variable for urlRoom()
var urlTimer;

// When DOM has loaded
document.addEventListener('DOMContentLoaded', function() {

  // Load roomNameFile
  loadRooms().then(function(response) {
    // Check if content loaded
    // console.log(roomNames);
  }, function(error) {
    console.error('Failed!', error);
  });

  // Load helpFile
  loadFile('helpbox', helpFile).then(function(response) {
    // Check if content loaded
    // console.log('Help Content Loaded');
  }, function(error) {
    console.error('Failed!', error);
  });

  // Load devFile
  loadFile('devbox', devFile).then(function(response) {
    // Check if content loaded
    // console.log('Developer Content Loaded');
  }, function(error) {
    console.error('Failed!', error);
  });

  // Popup elements
  var building = document.getElementById('building');
  var floor = document.getElementById('floor');
  var menu = document.getElementById('menu');
  var search = document.getElementById('search');

  // Setup popup elements
  activatePopup(building, 'building-popup');
  activatePopup(floor, 'floor-popup');
  activatePopup(menu, 'menu-popup');
  activatePopup(search, 'search-popup');

  urlRoom();

  // If the user goes back in the browser reload the last loction
  window.addEventListener('popstate', function(e) {
    console.log("website auto calls urlRoom");
    urlTimer = setTimeout(function(){ urlRoom(); }, 100);
  });
});

// Load the proper map based on url
function urlRoom() {
  console.log("urlRoom started");
  if (window.navigator.userAgent.indexOf("Edge") > -1) {
    // Do nothing
  } else {
    // Get the location hash
    var hash = window.location.hash;
    // Remove everything before the last '#' sign
    var room = hash.substring(hash.lastIndexOf('#')+1);
    if (room !== '' && !room.includes('.') && room.toLowerCase() !== 'campus') { // If room is set and not campus or have a '.'
      switch (room.toUpperCase()) { // If room is a building letter use changeFloor to lowest floor of building
        case '2':
          changeFloor('2');
          break;
        case '3':
          changeFloor('3', '1');
          break;
        case 'A':
          changeFloor('A');
          break;
        case 'B':
          changeFloor('B', '1');
          break;
        case 'C':
          changeFloor('C', '1');
          break;
        case 'C3':
          changeFloor('C3', 'G');
          break;
        case 'D':
          changeFloor('D', '1');
          break;
        case 'E':
          changeFloor('E', '1');
          break;
        case 'F':
          changeFloor('F', '1');
          break;
        case 'H':
          changeFloor('H', '1');
          break;
        case 'I':
          changeFloor('I', '1');
          break;
        case 'L':
          changeFloor('L', '1');
          break;
          // If not a valid building, don't try loading URL after search attempt
        case 'G':
        case 'J':
        case 'K':
        case 'M':
        case 'N':
        case 'O':
        case 'P':
        case 'Q':
        case 'R':
        case 'S':
        case 'T':
        case 'U':
        case 'V':
        case 'W':
        case 'X':
        case 'Y':
        case 'Z':
          window.location.hash = "Campus";
          break;
        default: // If not a building letter search for the room
          // This search seems to be repetitive
          console.log("urlRoom calls searchFromMenu");
          searchFromMenu(room);
      }
    } else { // Otherwise just load the map of campus
      addMap(campus, 'Campus').then(function(response) {
        // Check if content loaded
        // console.log('Success!');

        // Set hash to Campus
        window.location.hash = "Campus";
        // Clear the search bar
        document.getElementById('search').value = '';
      }, function(error) {
        console.error('Failed!', error);
      });
    }
  }
}

// Loads and parses roomNameFile into a JSON object
function loadRooms() {
  console.log("loadRooms started");
  // Ensure that the file has loaded before certain functions are called
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('GET', roomNameFile, true);
    req.onload = function() {
      // if (req.readyState!==4) reject(Error(req.statusText));
      if (req.status!==200) reject(Error(req.statusText));

      // Parse the response into a JSON object
      roomNames = JSON.parse(req.response);

      resolve(req.response);
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send();
  });
}

function addMap(mapLocation, building, floor) {
  console.log("addMap started");
  var curBuild = document.getElementById('building'); // Current Building
  var curFloor = document.getElementById('floor'); // Current Floor
  var mapHolder = document.getElementById('svg-holder'); // Div that contains the map

  // Ensure that the file has loaded before certain functions are called
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('GET', mapLocation, true);
    req.onload = function() {
      // if (req.readyState!==4) reject(Error(req.statusText));
      if (req.status!==200) reject(Error(req.statusText));

      if (building !== curBuild) { // If building is being changed
        var buildingPop = document.getElementById("building-popup"); // Building Popup
        var dropdown = document.getElementsByClassName('dropdown')[0]; // Floor Dropdown
        var legend = document.getElementsByClassName('campus-info')[0]; // Parking Legend

        if (building === 'Campus') { // If changing to campus
          // Hide the building popup
          hideElement(buildingPop, HIDE);
          // Show the parking legend
          if(eatCookie('legend')==='show'){
            hideElement(legend, SHOW);
            document.getElementById('pLegend').style.display = "inherit";
            // console.log("SHOWN");
          } else {
            hideElement(legend,HIDE);
            document.getElementById('pLegend').style.display = "none";
            // console.log("HIDDENLEGEND");
          }
        }
        else { // Otherwise
          // Show the building popup
          hideElement(buildingPop, SHOW);
          // Hide the parking legend
          hideElement(legend, HIDE);
        }

        if (floor !== undefined) { // If a floor is passed in
          // Show the current floor and floor dropdown
          hideElement(curFloor, SHOW);
          hideElement(dropdown, SHOW);
          floorDropDown(building);
          // Change the current floor
          curFloor.innerHTML = 'FL' + floor;
        }
        else { // Otherwise
          // Hide the current floor and floor dropdown
          hideElement(curFloor, HIDE);
          hideElement(dropdown, HIDE);
        }
      }

      // Remove all maps
      removeMap();
      // Add new map
      mapHolder.appendChild(convertToElement(req.response));
      // Set the map height to the browser's height and enable panZoomTiger
      var map = mapHolder.childNodes[0];
      map.style.height = getClientHeight();
      // Set current building to building
      curBuild.innerHTML = building;

      // Setup touch events
      var eventsHandler;
      eventsHandler = {
        haltEventListeners: ['touchStart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
        init: function(options) {
          var instance = options.instance,
          initialScale = 1,
          pannedX = 0,
          pannedY = 0;

          // Init Hammer
          // Listen only for pointer and touch events
          this.hammer = Hammer(options.svgElement, {
            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
          });

          // Enable pinch
          this.hammer.get('pinch').set({enable: true});

          // Handle double tap
          this.hammer.on('doubletap', function(ev) {
            instance.zoomIn();
          });

          // Handle pan
          this.hammer.on('panstart panmove', function(ev) {
            // On pan start reset panned variables
            if (ev.type === 'panstart') {
              pannedX = 0;
              pannedY = 0;
            }

            // Pan only the difference
            instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY});
            pannedX = ev.deltaX;
            pannedY = ev.deltaY;
          });

          // Handle pinch
          this.hammer.on('pinchstart pinchmove', function(ev) {
            // On pinch start remember initial zoom
            if (ev.type === 'pinchstart') {
              initialScale = instance.getZoom();
              instance.zoom(initialScale * ev.scale);
            }

            instance.zoom(initialScale * ev.scale);
          });

          this.hammer.on('tap', function(ev) {
            toggleTab(ev, 'helpbox');
            toggleTab(ev, 'devbox');
            if (building === 'Campus') {
              var target = ev.target.parentNode.id.toUpperCase();
              if (target === 'A') {
                changeFloor(target);
              }
              else if (target === 'C3') {
                changeFloor(target, 'G');
              }
              else {
                for (var rbuilding in roomNames) {
                  if (target === rbuilding) {
                    changeFloor(rbuilding, '1');
                  }
                }
              }
            }
            else {
              var room = ev.target.parentNode.id;
              if (room.length === 4 || room.length === 5) {
                console.log("addMap calls activateRoom");
                activateRoom(ev.target.parentNode.id);
              }
            }
          });

          // Prevent moving the page on some devices when panning over SVG
          options.svgElement.addEventListener('touchmove', function(e) { e.preventDefault(); });
        },
        destroy: function() {
          this.hammer.destroy();
        }
      };

      // Add the eventsHandler for touch to the svgPanZoom
      var panZoomTiger = svgPanZoom(map, {
        controlIconsEnabled:true,
        fit:1,
        center:1,
        customEventsHandler: eventsHandler
      });

      // Resize the panZoomTiger when the window resizes
      window.addEventListener('resize', function() {
        // Resize the map height to adjust the panZoomTiger height
        map.style.height = getClientHeight();

        panZoomTiger.resize();
        panZoomTiger.fit();
        panZoomTiger.center();
      });

      resolve(req.response);
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send();
  });
}

// Remove all maps from the svg-holder
function removeMap() {
  console.log("removeMap started");
  var mapHolder = document.getElementById('svg-holder');
  // Just in case multiple elements get added to svg-holder
  while (mapHolder.hasChildNodes()) {
    mapHolder.removeChild(mapHolder.lastChild);
  }
}

// Reset the floor dropdown based on the building
function floorDropDown(building) {
  console.log("floorDropDown started");
  // Floor dropdown
  var dropdown = document.getElementsByClassName('floors')[0];
  // Remove all floors from dropdown
  while (dropdown.hasChildNodes()) {
    dropdown.removeChild(dropdown.lastChild);
  }

  var floors = [];

  switch (building) { // Select the proper floor array based on building
    case '2':
      floors = floors2;
      break;
    case '3':
      floors = floors3;
      break;
    case 'A':
      floors = floorsA;
      break;
    case 'B':
      floors = floorsB;
      break;
    case 'C':
      floors = floorsC;
      break;
    case 'C3':
      floors = floorsC3;
      break;
    case 'D':
      floors = floorsD;
      break;
    case 'E':
      floors = floorsE;
      break;
    case 'F':
      floors = floorsF;
      break;
    case 'H':
      floors = floorsH;
      break;
    case 'I':
      floors = floorsI;
      break;
    case 'L':
      floors = floorsL;
      break;
  }

  for (var i = 0; i < floors.length; i++) { // Create a element for each floor and add it to the dropdown
    var option = '<h2 onclick="changeFloor(\'' + building + '\', \'' + floors[i] + '\')">Floor ' + floors[i] + '</h2>';
    dropdown.appendChild(convertToElement(option));
  }
}

// Highlight a room
// roomID the ID of the room to highlight
// search True/False was the room being searched for
function activateRoom(roomID, search) {
  console.log(">>>>> activateRoom started");
  //room 4983 does not exist. no room to activate so return
  if(roomID === "4983") {
    return;
  }
  var roomClass = 'room-group';
  var room = document.getElementById(roomID.toLowerCase());

  if (room === null) { // If room is null alert the user
    alert("Sorry, room number " + roomID + " couldn't be found in this building.");
  }
  else {
    var roomClassName = room.className.baseVal;

    // When searching for a room don't let searching for the same room twice add and remove active-room class the room
    if (roomClassName !== roomClass && !search) { // If not searching for room

      if (roomClassName === roomClass + ' active-room') { // Check to deactivate room
        deactivateAllRooms();
        return;
      }
      return;
    }
    else if (roomClassName === roomClass) { // If searching for room

      deactivateAllRooms();
      // add active-room to the room
      room.classList.add('active-room');
    }
  }
}

// Remove active-room from all rooms
function deactivateAllRooms() {
  console.log("deactivateAllRooms started");
  var roomClass = 'room-group';
  var room = document.getElementsByClassName(roomClass);

  for (var i = 0; i < room.length; i++) { // Remove active-room from all rooms
    room[i].classList.remove('active-room');
  }
}

// Call searchRoomNumber when the user presses enter
function searchFromBar(event) {
  console.log("searchFromBar started");
  if (event.which == 13 || event.keyCode == 13) {
    console.log("searchFromBar calls searchRoomNumber");
    searchRoomNumber();
  }
}

// Search by passing the room into the function
function searchFromMenu(sRoom) {
  console.log("searchFromMenu started");
  closeMenu();
  console.log("searchFromMenu calls parseSearch");
  var search = parseSearch(sRoom);
  if (search.roomName !== '') {
    // If roomName is not empty then add the roomName to the search bar
    document.getElementById('roomSearch').value = search.roomName;
  }
  else {
    // Otherwise add the building and room to the search bar
    document.getElementById('roomSearch').value = search.building + ' ' + search.room;
  }
  console.log("searchFromMenu calls searchRoomNumber");
  searchRoomNumber();
}

// Search for a room
function searchRoomNumber() {
  console.log("searchRoomNumber started");
  console.log("searchRoomNumber calls parseSearch");
  // Create the var rInfo and set it to the parsed value of the search bar, forced to uppercase
  var rInfo = parseSearch(document.getElementById('roomSearch').value.toUpperCase()); // The room being searched for

  // If the Campus map is being searched for load the map and end the function
  if (rInfo.roomName.toLowerCase() === 'campus') {
    // Clear search bar if roomName is campus
    document.getElementById('roomSearch').value = '';
    changeFloor('Campus');
  }
  // Otherwise actually search for a building and/or room number
  else {
    // Set roomNum to arbitrary non existent room number 4983
    // to prevent errors when only searching building letter
    // will change if a room number is in search string
    var roomNum = "4983";
    var building = document.getElementById('building').innerHTML; // Current Building
    var curBuild = building;
    var floor = document.getElementById('floor').innerHTML; // Current Floor

    // Empty variables to compare the search to the current
    var newBuilding = '';
    var newFloor = '';

    // Assign variables from rInfo
    if (rInfo.building !== '') {
      building = rInfo.building;
    }
    if (rInfo.room !== '') {
      roomNum = rInfo.room;
    }
    if (rInfo.roomName !== '') { // Search by names instead of numbers
      roomNum = '';
      // Search through the roomNames object for the name being searched
      // Buildings
      for (var rmBuilding in roomNames) {
        var tempBuilding = rmBuilding;

        // Floors
        for (var rmFloor in roomNames[rmBuilding]) {
          var tempFloor = rmFloor;

          // Rooms
          for (var rmRoom in roomNames[rmBuilding][rmFloor]) {
            var tempRoom = roomNames[rmBuilding][rmFloor][rmRoom];

            if (tempRoom.name.toLowerCase() === rInfo.roomName.toLowerCase()) {
              // Set the variables based on data from roomNames object
              newBuilding = tempBuilding;
              newFloor = tempFloor;
              roomNum = tempRoom.id;
            }
          }
        }
      }

      // Update the location hash to the room name

      if (roomNum === '') { // If no room is found alert the user
        alert('Were you trying to search by nickname? Unfortunately, "' +
              rInfo.roomName + '" is not recognized.\nPlease check your spelling, ' +
              'or try a more common name.\n\nExample: Search for "Moes" not "Mo"');
      } else {
        window.location.hash = rInfo.roomName;
      }
    }
    else {

      var upperHash = function() {
        console.log("upperHash started");
        // Update the location hash to be the building plus the room number
        if(roomNum !== "4983") {
          window.location.hash = building.toUpperCase() + roomNum.toUpperCase();
        }
        else {
          window.location.hash = building.toUpperCase();
        }
        console.log("urlRoom stopped by upperHash()");
        clearTimeout(urlTimer);
      };
      upperHash();
      switch (building[0].toUpperCase()) {
        // Select the proper building and floor for the search variables
        case '2':
            newBuilding = '2';
            newFloor = undefined;
          break;
        case '3':
          if (roomNum[0] === '4') {
            newBuilding = '3';
            newFloor = '4';
          }
          else if (roomNum[0] === '3') {
            newBuilding = '3';
            newFloor = '3';
          }
          else if (roomNum[0] === '2') {
            newBuilding = '3';
            newFloor = '2';
          }
          else {
            newBuilding = '3';
            newFloor = '1';
          }
          break;
        case 'A':
            newBuilding = 'A';
            newFloor = undefined;
          break;
        case 'B':
          if (roomNum[0] === '3') {
            newBuilding = 'B';
            newFloor = '3';
          }
          else if (roomNum[0] === '2') {
            newBuilding = 'B';
            newFloor = '2';
          }
          else if (roomNum[0] === '1') {
            newBuilding = 'B';
            newFloor = '1';
          }
          else {
            newBuilding = 'B';
            newFloor = '1';
          }
          break;
        case 'C':
          // C3 is defined by the second number of the room as being a 3
          if (roomNum[1] === '3') { // C3
            if (roomNum[0] === '2') {
              newBuilding = 'C3';
              newFloor = '2';
            }
            else if (roomNum[0] === '1') {
              newBuilding = 'C3';
              newFloor = '1';
            }
            else {
              newBuilding = 'C3';
              newFloor = 'G';
            }
          }
          else { // C
            if (roomNum[0] === '2') {
              newBuilding = 'C';
              newFloor = '2';
            }
            else {//single letter search fix
              newBuilding = 'C';
              newFloor = '1';
            }
          }
          break;
        case 'D':
          if (roomNum[0] === '2') {
            newBuilding = 'D';
            newFloor = '2';
          }
          else if (roomNum[0] === '1') {
            newBuilding = 'D';
            newFloor = '1';
          }
          else {//single letter search fix
            newBuilding = 'D';
            newFloor = '1';
          }
          break;
        case 'E':
          if (roomNum[0] === '3') {
            newBuilding = 'E';
            newFloor = '3';
          }
          else if (roomNum[0] === '2') {
            newBuilding = 'E';
            newFloor = '2';
          }
          else if (roomNum[0] === '1') {
            newBuilding = 'E';
            newFloor = '1';
          }
          else {
            newBuilding = 'E';
            newFloor = '1';
          }
          break;
        case 'F':
          if (roomNum[0] === '2') {
            newBuilding = 'F';
            newFloor = '2';
          }
          else if (roomNum[0] === '1') {
            newBuilding = 'F';
            newFloor = '1';
          }
          else {
            newBuilding = 'F';
            newFloor = '1';
          }
      case 'H':
        if (roomNum[0] === '3') {
          newBuilding = 'H';
          newFloor = '3';
        }
        else if (roomNum[0] === '2') {
          newBuilding = 'H';
          newFloor = '2';
        }
        else if (roomNum[0] === '1') {
          newBuilding = 'H';
          newFloor = '1';
        }
        else {//single letter search fix
          newBuilding = 'H';
          newFloor = '1';
        }
        break;
      case 'I':
        if (roomNum[0] === '3') {
          newBuilding = 'I';
          newFloor = '3';
        }
        else if (roomNum[0] === '2') {
          newBuilding = 'I';
          newFloor = '2';
        }
        else if (roomNum[0] === '1') {
          newBuilding = 'I';
          newFloor = '1';
        }
        else {//single letter search fix
          newBuilding = 'I';
          newFloor = '1';
        }
        break;
      case 'L':
        if (roomNum[0] === '3') {
          newBuilding = 'L';
          newFloor = '3';
        }
        else if (roomNum[0] === '2') {
          newBuilding = 'L';
          newFloor = '2';
        }
        else if (roomNum[0] === '1') {
          newBuilding = 'L';
          newFloor = '1';
        }
        else {//single letter search fix
          newBuilding = 'L';
          newFloor = '1';
        }
        break;
      //added cases for non existent buildings. switches to campus map
      case 'G':
      case 'J':
      case 'K':
      case 'M':
      case 'N':
      case 'O':
      case 'P':
      case 'Q':
      case 'R':
      case 'S':
      case 'T':
      case 'U':
      case 'V':
      case 'W':
      case 'X':
      case 'Y':
      case 'Z':
      // If the search involves an incorrect building AND room number stop search attempts
      // notify user that building searched does not exist
      if (roomNum[0] === '0' || roomNum[0] === '1' || roomNum[0] === '2' ||
          roomNum[0] === '3' || roomNum[0] === '4' || roomNum[0] === '5' ||
          roomNum[0] === '6' || roomNum[0] === '7' || roomNum[0] === '8' ||
          roomNum[0] === '9') {
            alert("Did you mean to search for building " + building + "?\nThat building doesn't exist.");
            break;

          }
            alert(building + " is an invalid building.");
          changeFloor('Campus');
          break;
        default: // Alert user of invalid characters
        // This alert is only reached when foreign characters that are read as
        // a single character are used
        // Examples: Spanish: ñ, ó, Russian: б,
        // Characters/Symbols that are interpreted as more than one don't trigger
        // this alert
        // Examples: German: ß (interpreted as "ss"), Chinese: 你 (Interpreted as "you")
          alert("I'm sorry, " + building + " is a character we don't understand.");
      }
    }
    if (curBuild !== newBuilding || floor !== newFloor) { // If either the building or the floor are different then a different map has to be loaded
      console.log("searchRoomNumber calls searchNewFloor");
      searchNewFloor(newBuilding, newFloor, roomNum);
    }
    else { // Otherwise activate the room
      console.log("searchRoomNumber calls activateRoom");
      activateRoom(roomNum, true);
    }
  }
}

// Retrieve the file location of the map
function getMap(building, floor) {
  console.log("getMap started");

  var newMap = '';

  switch (building) {
    // Select the proper building and floor
    case 'Campus':
      newMap = campus;
      break;
    case '2':
      newMap = building2[0];
      break;
    case '3':
      if (floor === '4') {
        newMap = building3[3];
      }
      else if (floor === '3') {
        newMap = building3[2];
      }
      else if (floor === '2') {
        newMap = building3[1];
      }
      else {
        newMap = building3[0];
      }
      break;
    case 'A':
      newMap = buildingA[0];
      break;
    case 'B':
      if (floor === '3') {
        newMap = buildingB[2];
      }
      else if (floor === '2') {
        newMap = buildingB[1];
      }
      else {
        newMap = buildingB[0];
      }
      break;
    case 'C':
      if (floor === '1') {
        newMap = buildingC[0];
      }
      else {
        newMap = buildingC[1];
      }
      break;
    case 'C3':
      if (floor === '2') {
        newMap = buildingC3[2];
      }
      else if (floor === '1') {
        newMap = buildingC3[1];
      }
      else {
        newMap = buildingC3[0];
      }
      break;
    case 'D':
      if (floor === '2') {
        newMap = buildingD[1];
      }
      else {
        newMap = buildingD[0];
      }
      break;
    case 'E':
      if (floor === '3') {
        newMap = buildingE[2];
      }
      else if (floor === '2') {
        newMap = buildingE[1];
      }
      else {
        newMap = buildingE[0];
      }
      break;
    case 'F':
      if (floor === '2') {
        newMap = buildingF[1];
      }
      else {
        newMap = buildingF[0];
      }
      break;
    case 'H':
      if (floor === '3') {
        newMap = buildingH[2];
      }
      else if (floor === '2') {
        newMap = buildingH[1];
      }
      else {
        newMap = buildingH[0];
      }
      break;
    case 'I':
      if (floor === '3') {
        newMap = buildingI[2];
      }
      else if (floor === '2') {
        newMap = buildingI[1];
      }
      else {
        newMap = buildingI[0];
      }
      break;
    case 'L':
      if (floor === '3') {
        newMap = buildingL[2];
      }
      else if (floor === '2') {
        newMap = buildingL[1];
      }
      else {
        newMap = buildingL[0];
      }
      break;
  }
  console.log("getMap returning");
  return newMap;
}

// Swap which floor of a building is being displayed
function changeFloor(building, floor) {
  console.log("changeFloor started");
  closeMenu();
  var newWindow = building.toUpperCase();
  var searchBar = document.getElementById('roomSearch');
  // Clear the search bar
  searchBar.value = '';

  newWindow = getMap(building, floor);

  if (newWindow !== '') { // Provided that newWindow got set then add the map
    addMap(newWindow, building, floor).then(function(response) {
      // console.log('Success!');
      // Update the location hash to the building letter
      window.location.hash = building;
      console.log("urlRoom stopped by changeFloor");
      clearTimeout(urlTimer);
    }, function(error) {
      console.error('Failed!', error);
    });
  }
}

// Load the new map before activating the room
function searchNewFloor(building, floor, roomNum) {
  console.log("searchNewFloor started");
  var newWindow = building;
  var curBuild = document.getElementById('building');
  var curFloor = document.getElementById('floor');

  if (curBuild.innerHTML !== building || curFloor.innerHTML !== floor) { // Check to make sure that the map needs to change
    console.log("searchNewFloor calls getMap");
    newWindow = getMap(building.toUpperCase(), floor);

    if (newWindow !== '') { // Provided that newWindow got set then add the map
      console.log("searchNewFloor calls addMap");
      addMap(newWindow, building, floor).then(function(response) {
        // console.log('Success!');
        console.log("searchNewFloor calls activateRoom");
        activateRoom(roomNum, true);
      }, function(error) {
        console.error('Failed!', error);
      });
    }
  }
}
