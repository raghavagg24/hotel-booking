// Selected room details
let selectedRoom = "Deluxe Room";
let roomPrice = 3000;


// SELECT ROOM
function selectRoom(room, price) {

    selectedRoom = room;
    roomPrice = price;

    // Change dropdown value
    document.getElementById("room").value = price;

    // Scroll to booking section
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    calculatePrice();
}


// GET ELEMENTS
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const room = document.getElementById("room");


// ROOM DROPDOWN CHANGE
room.addEventListener("change", function () {

    roomPrice = Number(this.value);

    if (roomPrice === 3000) {
        selectedRoom = "Deluxe Room";
    }

    else if (roomPrice === 5000) {
        selectedRoom = "Premium Room";
    }

    else {
        selectedRoom = "Luxury Suite";
    }

    calculatePrice();
});


// CALCULATE TOTAL PRICE
function calculatePrice() {

    const startDate = new Date(checkin.value);
    const endDate = new Date(checkout.value);

    let nights = 1;

    if (
        checkin.value &&
        checkout.value &&
        endDate > startDate
    ) {

        const difference =
            endDate.getTime() - startDate.getTime();

        nights =
            Math.ceil(difference / (1000 * 60 * 60 * 24));
    }

    const total = roomPrice * nights;

    document.getElementById("totalPrice").innerText =
        "₹" + total.toLocaleString("en-IN");
}


// DATE CHANGE
checkin.addEventListener("change", calculatePrice);
checkout.addEventListener("change", calculatePrice);


// BOOKING FORM
document.getElementById("bookingForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const checkinDate =
        document.getElementById("checkin").value;

    const checkoutDate =
        document.getElementById("checkout").value;

    const startDate = new Date(checkinDate);
    const endDate = new Date(checkoutDate);

    // Check valid dates
    if (endDate <= startDate) {

        alert("Please select a valid check-out date.");

        return;
    }


    // Calculate nights
    const difference =
        endDate.getTime() - startDate.getTime();

    const nights =
        Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );


    // Calculate total
    const total = roomPrice * nights;


    // Show confirmation
    document.getElementById("confirmationText").innerText =
        `Thank you ${name}! Your ${selectedRoom} has been booked for ${nights} night(s). Total amount: ₹${total.toLocaleString("en-IN")}.`;


    document.getElementById("popup").classList.add("show");

});


// CLOSE POPUP
function closePopup() {

    document.getElementById("popup").classList.remove("show");

}


// SET MINIMUM DATE AS TODAY
const today = new Date().toISOString().split("T")[0];

checkin.min = today;
checkout.min = today;


// MOBILE MENU
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {

    if (navLinks.style.display === "flex") {

        navLinks.style.display = "none";

    } else {

        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "70px";
        navLinks.style.right = "20px";
        navLinks.style.background = "#222";
        navLinks.style.padding = "20px";
        navLinks.style.borderRadius = "8px";

    }

});
