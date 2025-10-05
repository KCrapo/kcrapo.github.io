async function formData() {
  const stateSelect = document.querySelector("#stateSelect");
  const countySelect = document.querySelector("#countySelect");
  const zipInput = document.querySelector("#zip");
  const cityText = document.querySelector("#cityText");
  const latText = document.querySelector("#latText");
  const lngText = document.querySelector("#lngText");

  let statesData;

  // Load all states
  try {
    const response = await fetch("https://csumb.space/api/allStatesAPI.php");
    statesData = await response.json();
    if (!response.ok) {
      throw new Error("Response failed");
    }
  } catch (error) {
    console.error("Fetch or JSON Error (states):", error);
  }

  // Populate states option list
  if (Array.isArray(statesData)) {
    for (let stateData of statesData) {
      const stateOption = document.createElement("option");
      stateOption.id = stateData.usps;
      stateOption.value = stateData.usps;
      stateOption.textContent = stateData.state;
      stateSelect.appendChild(stateOption);
    }
  }
  //console.log(statesData);
  // Fetch city details dynamically by ZIP
  async function updateCity(zip) {
    try {
      const response = await fetch(
        `https://csumb.space/api/cityInfoAPI.php?zip=${zip}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Response failed");
      }

      // Accounting for zip not found
      if (!data || !data.city || !data.zip) {
        const zipNotfound = document.querySelector("#zipNotFound");
        zipNotfound.textContent = "Invalid Zip code";
        zipNotfound.style.color = "red";
        throw new Error("Invalid Zip Code");
      }

      cityText.textContent = data.city;
      latText.textContent = data.latitude;
      lngText.textContent = data.longitude;

      if (data.usps) {
        for (let opt of stateSelect.options) {
          if (opt.value.toUpperCase() === data.usps.toUpperCase()) {
            stateSelect.value = opt.value;
            updateCounties(opt.value);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Fetch or JSON Error (city):", error);
    }
  }

  async function updateCounties(stateAbbrev) {
    try {
      const response = await fetch(
        `https://csumb.space/api/countyListAPI.php?state=${stateAbbrev}`
      );
      if (!response.ok) {
        throw new Error("Response failed");
      }

      const data = await response.json();

      // Error checking
      if (!countySelect) return;

      // This is saying that for every item (index) of the countiesData array
      // create a new option and add it to the countyOption html. Each option will have the county name, text content, and id of the county
      countySelect.length = 1;
      for (let item of data) {
        let countyOption = document.createElement("option");
        countyOption.id = item.county;
        countyOption.value = item.county;
        countyOption.textContent = item.county;
        countySelect.appendChild(countyOption);
      }
    } catch (error) {
      console.error("Fetch or JSON Error (counties):", error);
    }
  }

  // County Event Listener
  stateSelect.addEventListener("change", (e) => {
    const state = e.target.value.trim();
    if (state) {
      updateCounties(state);
    }
  });

  // ZIP input listener
  zipInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val.length === 5) {
      updateCity(val);
    }
  });
}

formData();

// Password Suggestion (Wasn't sure how hard you wanted us to go on this)
let sPassword = "F@123456#$%^";
const pwInput = document.querySelector("#password");
const pwHint = document.querySelector("#pwSuggestion");

pwInput.addEventListener("click", () => {
  pwHint.textContent = "Suggested: " + sPassword;
  if (!pwInput.value) {
    pwInput.value = sPassword;
  }
});

const usernameInput = document.querySelector("#username");
const msg = document.querySelector("#aMessage");
const pwConfirm = document.querySelector("#pwConfirm");

function usernameStatus() {
  const options = ["eeny", "meeny", "miny", "maria"];
  const name = usernameInput.value.trim().toLowerCase();

  if (name.length < 3) {
    msg.textContent = "Min 3 characters";
    msg.style.color = "red";
    usernameInput.style.borderColor = "red";
    return false;
  }

  if (options.includes(name)) {
    msg.textContent = "TAKEN";
    msg.style.color = "red";
    usernameInput.style.borderColor = "red";
    return false;
  }

  msg.textContent = "AVAILABLE";
  msg.style.color = "green";
  usernameInput.style.borderColor = "green";
  return true;
}

// Username check outside submit
usernameInput.addEventListener("input", function () {
  usernameStatus();
});

document.querySelector("#submit").addEventListener("click", isValid);


function isValid() {
  const nameOk = usernameStatus();
  const pw = pwInput.value;
  const pw2 = pwConfirm.value;

  if (!nameOk) {
    return;
  }

  if (pw.length < 6) {
    msg.textContent = "At least 6 characters";
    msg.style.color = "red";
    
    return;
  }

  if (pw2.length > 0) {
    if (pw !== pw2) {
      msg.textContent = "Passwords do not match";
      msg.style.color = "red";
      return;
    }
  }

  msg.textContent = "READY";
  msg.style.color = "green";
}

