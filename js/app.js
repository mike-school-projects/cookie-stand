'use strict';

// Global Variables *******************************************************
let i=0;


// DOM Windows ***********************************************************
let SeattleDOM = document.getElementById('Seattle-DOM');
let TokyoDOM = document.getElementById('Tokyo-DOM');
let DubaiDOM = document.getElementById('Dubai-DOM');
let ParisDOM = document.getElementById('Paris-DOM');
let LimaDOM = document.getElementById('Lima-DOM');

// Object Literals ********************************************************
let Seattle = new Location('Seattle',23, 65, 6.3, 600, 2000);
let Tokyo = new Location('Tokyo',3, 24, 1.2, 600, 2000);
let Dubai = new Location('Dubai',11, 38, 3.7, 600, 2000);
let Paris = new Location('Paris',20, 38, 2.3, 600, 2000);
let Lima = new Location('Lima',2, 16, 4.6, 600, 2000);
let locations = ['Seattle', 'Tokyo', 'Dubai', 'Paris', 'Lima'];
console.log(locations);


// Functions **************************************************************
// Function to create Location object for each store
function Location(store,min,max,avg,open,close) {
  this.name = store;
  this.minCustomers = min;
  this.maxCustomers = max;
  this.avgOrder = avg;
  this.openTime24 = open;
  this.closeTime24 = close;
  this.sales = [];
  this.salesTotal = 0;




  // This loop sets up sales array.
  // [0] hourly total, i.e. 5am, 6am,
  // [i][0] time in 12 hr format
  // [i][1] am/pm
  // [i][2] # cookie estimate
  // [i][3] # customer estimate
  // save [0] thru [3] into temp variables first, then save as array to [i]
  i=0;
  let time12;
  let ampm;
  let cookies;
  let customers;

  for (let currTime24 = this.openTime24; currTime24 < this.closeTime24; currTime24 = currTime24 + 100){
    time12 = currTime24 / 100;
    if (time12 > 12){
      time12 = time12 - 12;
    }

    if (currTime24 > 1159){
      ampm = 'pm';
    } else {
      ampm = 'am';
    }

    // taken from MDN docs
    customers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);

    cookies = Math.round(customers * this.avgOrder);

    this.salesTotal = this.salesTotal + cookies;
    this.sales[i] = [time12, ampm, cookies, customers];
    i++;
  }

  // THIS CODE DID NOT WORK.  this.sales[i][0] does not work.  Don't know why?????????  Bracket notation?
  // This loop sets up sales array.
  // [0] hourly total, i.e. 5am, 6am,
  // [i][0] time in 12 hr format
  // [i][1] am/pm
  // [i][2] # cookie estimate
  // [i][3] # customer estimate
  // i=0;
  // for (let currTime24 = this.openTime24; currTime24 < this.closeTime24; currTime24 = currTime24 + 100){
  //   this.sales[i][0] = currTime24 / 100;
  //   if (this.sales[i][0] > 12){
  //     this.sales[i][0] = this.sales[i][0] - 12;
  //   }

  //   if (currTime24 > 1159){
  //     this.sales[i][1] = 'pm';
  //   } else {
  //     this.sales[i][1] = 'am';
  //   }

  //   // taken from MDN docs
  //   this.sales[i][3] = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);

  //   this.sales[i][2] =Math.round(this.sales[i][3] * this.avgOrder);

  //   this.salesTotal = this.salesTotal + this.sales[i][2];
  //   i++;
  // }
}


// function display (store){
//   console.log(store.name);
//   console.log(`${store.sales[0]}${store.sales[1]}: ${store.sales[2]} cookies`);
// }


// DOM Manipulation *****************************************************
// Put this in a loop for each store #####################################################
function htmlDisplay (location, DOM){
  let articleElem = document.createElement('article');
  DOM.appendChild(articleElem);

  let h2Element = document.createElement('h2');
  h2Element.textContent = location.name;
  articleElem.appendChild(h2Element);

  let ulElement = document.createElement('ul');
  articleElem.appendChild(ulElement);

  for (i=0; i < location.sales.length; i++){
    let text = `${location.sales[i][0]}${location.sales[i][1]}: ${location.sales[i][2]} cookies         `;

    let liElem = document.createElement('li');
    liElem.textContent = text;
    ulElement.appendChild(liElem);
  }

  let pElement = document.createElement('p');
  pElement.textContent = `Total: ${location.salesTotal}`;
  articleElem.appendChild(pElement);
}

// Executable Code *******************************************************
// console.log(Seattle, SeattleDOM);
// console.log(Tokyo, TokyoDOM);
// console.log(Dubai, DubaiDOM);
// console.log(Paris, ParisDOM);
// console.log(Lima, LimaDOM);

htmlDisplay(Seattle, SeattleDOM);
htmlDisplay(Tokyo, TokyoDOM);
htmlDisplay(Dubai, DubaiDOM);
htmlDisplay(Paris, ParisDOM);
htmlDisplay(Lima, LimaDOM);
