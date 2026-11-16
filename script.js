document.addEventListener("DOMContentLoaded", () => {
  // 1. Floating Rose Petals Effect
  const petalsContainer = document.getElementById("petals-container");

  function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 4 + 5 + "s";
    petal.style.transform = `scale(${Math.random() * 0.6 + 0.6})`;
    petalsContainer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 9000);
  }

  setInterval(createPetal, 650);

  // 2. Live Event Countdown Timer (Synced to Friday, November 20, 2026 at 9:00 PM)
  const eventDate = new Date("November 20, 2026 21:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      document.getElementById("countdown").innerHTML =
        "<p style='font-weight:600; color:#5e111d;'>The Celebration Has Begun!</p>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. RSVP Modal Controls & Email Sending (missavrilreyes22@gmail.com)
  const rsvpModal = document.getElementById("rsvp-modal");
  const openRsvpBtn = document.getElementById("open-rsvp-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const doneBtn = document.getElementById("done-btn");
  const rsvpForm = document.getElementById("rsvp-form");
  const submitRsvpBtn = document.getElementById("submit-rsvp-btn");
  const rsvpSuccess = document.getElementById("rsvp-success");
  const confirmationText = document.getElementById("confirmation-text");

  openRsvpBtn.addEventListener("click", () => {
    rsvpModal.classList.remove("hidden");
  });

  function closeModal() {
    rsvpModal.classList.add("hidden");
  }

  closeModalBtn.addEventListener("click", closeModal);
  doneBtn.addEventListener("click", closeModal);

  rsvpModal.addEventListener("click", (e) => {
    if (e.target === rsvpModal) closeModal();
  });

  // Handle RSVP Form Submission and Send to Email
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("guest-name").value.trim();
    const attendance = document.getElementById("attendance").value;
    const guests = document.getElementById("guests-count").value;
    const wishes = document.getElementById("wishes").value.trim() || "None";

    submitRsvpBtn.disabled = true;
    submitRsvpBtn.textContent = "Sending...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/missavrilreyes22@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Birthday RSVP from ${name}!`,
          Guest_Name: name,
          Attendance: attendance,
          Number_of_Guests: guests,
          Birthday_Wish: wishes
        })
      });

      if (response.ok) {
        rsvpForm.classList.add("hidden");
        rsvpSuccess.classList.remove("hidden");

        if (attendance === "Joyfully Accepts") {
          confirmationText.textContent = `We can't wait to celebrate with you, ${name}! Reserved for ${guests} guest(s).`;
        } else {
          confirmationText.textContent = `Thank you for letting us know, ${name}. You will be missed!`;
        }
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      showToast("Error sending RSVP. Please try again!");
      submitRsvpBtn.disabled = false;
      submitRsvpBtn.textContent = "Send Confirmation";
    }
  });

  // 4. View Map Button (Hacienda Amara Private Resort, Rodriguez, Rizal)
  const mapBtn = document.getElementById("map-btn");
  mapBtn.addEventListener("click", () => {
    const venueQuery = encodeURIComponent("Hacienda Amara Private Resort Montalban Rizal San Jose Rodriguez Rizal");
    window.open(`https://www.google.com/maps/search/?api=1&query=${venueQuery}`, "_blank");
  });

  // 5. Save Date (.ics Calendar File Download for Nov 20, 2026, 9PM - 6AM)
  const calendarBtn = document.getElementById("calendar-btn");
  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  calendarBtn.addEventListener("click", () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "SUMMARY:Birthday Celebration",
      "DESCRIPTION:Join us as we celebrate My Birthday!",
      "LOCATION:Hacienda Amara Private Resort, Montalban Heights, San Jose, Rodriguez, Rizal",
      "DTSTART:20261120T210000",
      "DTEND:20261121T060000",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "birthday-invitation.ics";
    link.click();

    showToast("Calendar invite downloaded!");
  });
});