const DELUXE_PER_NIGHT = 250;
const DOUBLE_PER_NIGHT = 180;
const SINGLE_PER_NIGHT = 150;

// rsvn multi steps
let currentTab = 0;
showTab(currentTab);

function showTab (n) {
  let x = document.getElementsByClassName('rsvnTab');
  x[n].style.display = 'block';
  if (n === 0) {
    document.getElementById('rsvnPrevBtn').style.display = 'none';
  } else {
    document.getElementById('rsvnPrevBtn').style.display = 'inline';
  }
  if (n === (x.length - 1)) {
    document.getElementById('rsvnNextBtn').innerHTML = 'Submit';
    document.getElementById('rsvnNextBtn').setAttribute('readySubmit', 'true');
    document.getElementById('rsvnNextBtn').setAttribute('type', 'submit');
    document.getElementById('rsvnNextBtn').setAttribute('onclick', 'submitMultiStepRsvn()');
  } else {
    document.getElementById('rsvnNextBtn').setAttribute('readySubmit', 'false');
    document.getElementById('rsvnNextBtn').setAttribute('type', 'button');
    document.getElementById('rsvnNextBtn').innerHTML = 'Next';
  }
  fixStepIndicator(n);
}

function submitMultiStepRsvn() {
  let canSubmit = document.getElementById('rsvnNextBtn').getAttribute('readySubmit');
  if (!validateRsvnForm() && !canSubmit) {
    return false;
  } else {
    console.log({
      cid: $('input[name="cid"][isForTest="true"]').val(),
      start: $('input[name="startDate"][isForTest="true"]').val(),
      end: $('input[name="endDate"][isForTest="true"]').val(),
      type: $('select[name="roomType"][isForTest="true"]').val(),
      requirement: $('select[name="roomRequirement"][isForTest="true"]').val(),
      adults: $('select[name="adults"][isForTest="true"]').val(),
      children: $('select[name="children"][isForTest="true"]').val(),
      requests: $('textarea[name="specialRequests"][isForTest="true"]').val()
    });
    // for pricing
    let bookedDate = document.getElementsByClassName('bookedDateTxt')[0].innerHTML;
    let numNights = document.getElementsByClassName('numNightsTxt')[0].innerHTML;
    let totalPrice = document.getElementsByClassName('totalTxt')[0].innerHTML;
    console.log('bookedDate', bookedDate);
    console.log('numNights', numNights);
    console.log('totalPrice', totalPrice);
  }
}

function fixStepIndicator (n) {
  let i;
  let x = document.getElementsByClassName('step');
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(' active', '');
  }
  x[n].className += ' active';
}

function rsvnNextPrev (n) {
  let x = document.getElementsByClassName('rsvnTab');
  if (n === 1 && !validateRsvnForm()) return false;
  x[currentTab].style.display = 'none';
  currentTab = currentTab + n;
  showTab(currentTab);
}

function validateRsvnForm () {
  let tab = document.getElementsByClassName('rsvnTab');
  let valid = true;
  let inputs = tab[currentTab].getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].hasAttribute('required')) {
      if (inputs[i].value === '') {
        inputs[i].className += ' invalid';
        valid = false;
      }
    }
  }

  let selects = tab[currentTab].getElementsByTagName('select');
  for (let i = 0; i < selects.length; i++) {
    if (selects[i].hasAttribute('required')) {
      if (selects[i].value === '') {
        selects[i].className += ' invalid';
        valid = false;
      }
    }
  }

  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
    new ReservationCost($('select[name="roomType"][isForTest="true"]').val(),
        $('input[name="startDate"][isForTest="true"]').val(),
        $('input[name="endDate"][isForTest="true"]').val()).displayAll();
  }
  return valid;
}

class ReservationCost {
  constructor (roomType, startDate, endDate) {
    let today = new Date();
    this.bookDate = today.toDateString();
    this.roomType = roomType;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }

  priceByRoomType () {
    if (this.roomType === 'Deluxe') {
      return DELUXE_PER_NIGHT;
    }
    if (this.roomType === 'Double') {
      return DOUBLE_PER_NIGHT;
    }
    if (this.roomType === 'Single') {
      return SINGLE_PER_NIGHT;
    }
  }

  numNights () {
    const diffInDaysFn = new UtilityFunctions();
    return diffInDaysFn.dateDiffInDays(this.startDate, this.endDate);
  }

  displayBookedDate () {
    document.getElementsByClassName('bookedDateTxt')[0].innerHTML = this.bookDate;
  }

  displayRoomPrice () {
    document.getElementsByClassName('roomPriceTxt')[0].innerHTML = '$' + this.numNights() * this.priceByRoomType();
  }

  displayNumNights () {
    document.getElementsByClassName('numNightsTxt')[0].innerHTML = this.numNights().toString();
    document.getElementsByClassName('roomPricePerNightTxt')[0].innerHTML = this.priceByRoomType();
  }

  displayFromTo () {
    let start = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + (this.startDate.getDate() + 1);
    let end = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1) + '-' + (this.endDate.getDate() + 1);
    document.getElementsByClassName('fromToTxt')[0].innerHTML = start + ' to ' + end;
  }

  displayTotalCost () {
    let totalRoomPrice = (this.numNights() * this.priceByRoomType());
    let taxesTxt = document.getElementsByClassName('taxesTxt')[0].innerHTML;
    document.getElementsByClassName('totalTxt')[0].innerHTML = (totalRoomPrice + parseInt(taxesTxt));
  }

  displayAll () {
    this.displayBookedDate();
    this.displayRoomPrice();
    this.displayNumNights();
    this.displayFromTo();
    this.displayTotalCost();
  }

}
$(document).ready(function () {

});
// todo
// [x] - validate inputs in the current tab on click next
// calculate difference between dates
