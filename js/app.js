'use strict';

// Global Variables *******************************************************
let i = 0;


// DOM Windows ***********************************************************
let StoreTable = document.getElementById('store-table'); // table of stores
let newStore = document.getElementById('new-store-form'); // new store form

// Object Literals ********************************************************
let Seattle = new Location('Seattle', 23, 65, 6.3, 600, 2000);
let Tokyo = new Location('Tokyo', 3, 24, 1.2, 600, 2000);
let Dubai = new Location('Dubai', 11, 38, 3.7, 600, 2000);
let Paris = new Location('Paris', 20, 38, 2.3, 600, 2000);
let Lima = new Location('Lima', 2, 16, 4.6, 600, 2000);
let locations = [Seattle, Tokyo, Dubai, Paris, Lima];

// Functions **************************************************************
// Constructor to create Location object for each store
function Location(store, min, max, avg, open, close) {
  this.name = store;
  this.minCustomers = min;
  this.maxCustomers = max;
  this.avgOrder = avg;
  this.openTime24 = open;
  this.closeTime24 = close;
  this.sales = [];
  this.salesTotal = 0;
}

Location.prototype.salesEstimate = function () {
  // This loop sets up sales array within the location
  // [0] hourly total, i.e. 5am, 6am,
  // [i][0] time in 12 hr format
  // [i][1] am/pm
  // [i][2] # cookie estimate
  // [i][3] # customer estimate
  // save [0] thru [3] into temp variables first, then save as array to [i]
  i = 0;
  let time12;
  let ampm;
  let cookies;
  let customers;

  for (let currTime24 = this.openTime24; currTime24 < this.closeTime24; currTime24 = currTime24 + 100) {
    time12 = currTime24 / 100;
    if (time12 > 12) {
      time12 = time12 - 12;
    }

    if (currTime24 > 1159) {
      ampm = 'pm';
    } else {
      ampm = 'am';
    }

    // taken from MDN docs.  Calc random number of customers
    customers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
    cookies = Math.round(customers * this.avgOrder);

    this.salesTotal = this.salesTotal + cookies;
    this.sales[i] = [time12, ampm, cookies, customers];
    i++;
  }
};

Location.prototype.render = function (tableElem) {
  // create row
  let rowElem = document.createElement('tr');
  tableElem.appendChild(rowElem);

  // Add store name for 1st cell
  let cellElem = document.createElement('td');
  cellElem.textContent = this.name;
  rowElem.appendChild(cellElem);

  // Add hourly sales data to row
  for(let i=0; i < this.sales.length; i++){
    let cellElem = document.createElement('td');
    cellElem.textContent = this.sales[i][2];
    rowElem.appendChild(cellElem);
  }

  // Add final cell with totals
  cellElem = document.createElement('td');
  cellElem.textContent = this.salesTotal;
  rowElem.appendChild(cellElem);
};

// New store function
function handleSubmit (event){
  event.preventDefault();
  let tempArray=[];

  // store data from form to temp array
  tempArray[0] = event.target.storeName.value;
  tempArray[1] = Number(event.target.storeMinCust.value);
  tempArray[2] = Number(event.target.storeMaxCust.value);
  tempArray[3] = Number(event.target.storeAvgCust.value);
  tempArray[4] = 600;
  tempArray[5] = 2000;

  // create new store object
  let newStore = new Location(tempArray[0], tempArray[1], tempArray[2], tempArray[2], tempArray[3], tempArray[4]);

  // add new store to locations array
  locations.push(newStore);

  // clear table
  removeAllChildNodes(StoreTable);

  // build new table
  renderTable(locations);
}

// got this from https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// DOM Manipulation *****************************************************
function renderTable(stores){
  // create table element within DOM StoreTable
  let tableElem = document.createElement('table');
  StoreTable.appendChild(tableElem);

  // run sales estimate
  for (let j=0; j < locations.length; j++){
    locations[j].salesEstimate();
  }

  // create row
  let rowElem = document.createElement('tr');
  tableElem.appendChild(rowElem);

  // create blank cell for A1
  let headerElem = document.createElement('th');
  headerElem.textContent = 'Stores';
  rowElem.appendChild(headerElem);

  // create table headers with times from locations.Seattle.Sales
  for(let k=0; k < locations[0].sales.length; k++){
    headerElem = document.createElement('th');
    let text = stores[0].sales[k][0] + stores[0].sales[k][1];
    headerElem.textContent = text;
    rowElem.appendChild(headerElem);
  }

  // create Totals cell
  headerElem = document.createElement('th');
  headerElem.textContent = 'Daily Location Totals';
  rowElem.appendChild(headerElem);

  for (let j=0; j < locations.length; j++){
    locations[j].render(tableElem);
  }

  // create row
  rowElem = document.createElement('tr');
  tableElem.appendChild(rowElem);

  // create blank cell for A1
  headerElem = document.createElement('th');
  headerElem.textContent = 'Totals';
  rowElem.appendChild(headerElem);

  // create cells for hourly total
  for(let k=0; k < locations[0].sales.length; k++){
    headerElem = document.createElement('th');
    let hourlyTotal = 0;
    for (let m=0; m < stores.length; m++){
      hourlyTotal += stores[m].sales[k][2];
    }

    headerElem.textContent = hourlyTotal;
    rowElem.appendChild(headerElem);
  }

  // create cell for totals
  headerElem = document.createElement('th');
  let allStoreTotal = 0;
  for(let k=0; k < stores.length; k++){
    allStoreTotal += stores[k].salesTotal;
  }
  headerElem.textContent = allStoreTotal;
  rowElem.appendChild(headerElem);

}

// Executable Code *******************************************************
// Create table
renderTable(locations);

// New store form
newStore.addEventListener('submit', handleSubmit);
