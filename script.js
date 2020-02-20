const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

//convert string to number with unary operator '+'
let ticketPrice = +movieSelect.value;

//set movie data
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //Get indexes for selected seats
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //Save selected seats in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const totalSeats = selectedSeats.length;
  count.innerText = totalSeats;
  total.innerText = ticketPrice * totalSeats;
}

//Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie Select Event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  updateSelectedCount();
});

//Initial count and total set
updateSelectedCount();
