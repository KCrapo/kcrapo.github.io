async function formData() {
  let statesData;
  let cityData;

  try {
    let response = await fetch("https://csumb.space/api/allStatesAPI.php");
    statesData = await response.json();
    if (!response.ok) {
      throw new Error("Response failed");
    }
  } catch (error) {
    console.error("Fetch or JSON Error (states):", error);
  }

  let stateSelect = document.querySelector("#stateSelect");
  for (let stateData of statesData) {
    let stateOption = document.createElement("option");
    stateOption.id = stateData.usps;
    stateOption.value = stateData.usps;
    stateOption.textContent = stateData.state;
    stateSelect.appendChild(stateOption);
  }

  let zipInput = document.querySelector("#zip");
  let cityText = document.querySelector("#cityText");
  let latText = document.querySelector("#latText");
  let lngText = document.querySelector("#lngText");

  async function updateCity(zip) {
    try {
      let response = await fetch(
        `https://csumb.space/api/cityInfoAPI.php?zip=${zip}`
      );
      cityData = await response.json();
      if (!response.ok) {
        throw new Error("Response failed");
      }
      cityText.textContent = cityData.city || "";
      latText.textContent = cityData.latitude || "";
      lngText.textContent = cityData.longitude || "";
      if (cityData.usps) {
        for (let opt of stateSelect.options) {
          if (opt.value.toUpperCase() === cityData.usps.toUpperCase()) {
            stateSelect.value = opt.value;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Fetch or JSON Error (city):", error);
      
    }
  }

  zipInput.addEventListener("input", (e) => {
    let val = e.target.value.trim();
    if (val.length === 5) {
      updateCity(val);
    }
  });
}

formData();

// Display suggested password when clicking on "Password" text box
let sPassword = "123456"
let passWordTextBox = document.querySelector("#password").addEventListener("click", displaySuggestedPassword);

function displaySuggestedPassword(){
    alert("Use this password instead "+sPassword);
}


document.querySelector("#submit").addEventListener("click", isTaken);

// check dynamically when you click out.
function isTaken() {
    let options = ["eeny", "meeny", "miny", "maria"];
    let userName = document.querySelector("#username").value.trim();
    if (options.includes(userName)) {
      document.querySelector("#aMessage").textContent = "TAKEN";
    } else {
      document.querySelector("#aMessage").textContent = "AVAILABLE";
    }
  }

