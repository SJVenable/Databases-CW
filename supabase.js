// After install the supabase-js module
import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// Create a single supabase client for interacting with your database
const supabase = createClient('https://nvdcopccmmupvigzaxai.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZGNvcGNjbW11cHZpZ3pheGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDQyMzgsImV4cCI6MjAyOTQ4MDIzOH0.YkI4-92d2MqBkofnSvWphUfhS3_TfZWkGgOfv76cJcY')

const message = document.getElementById("message");
const resultBox = document.getElementById("results");

if(document.URL.includes("index.html")) {
  const peopleButton = document.getElementById("people-search");
  peopleButton.addEventListener("click", getPerson);
}

if(document.URL.includes("vehiclesearch.html")) {
  const vehicleButton = document.getElementById("vehicle-search");
  vehicleButton.addEventListener("click", getVehicle);
}

if(document.URL.includes("addvehicle.html")) {
  const addVehicleButton = document.getElementById("add-a-vehicle");
  addVehicleButton.addEventListener("click", addVehicle);
  document.getElementById("owner-add").hidden = true;
}

if(document.URL.includes("addvehicle.html")) {
  const addVehicleButton = document.getElementById("add-owner");
  addVehicleButton.addEventListener("click", addOwnerAndVehicle);
}

async function addOwnerAndVehicle() {
  document.getElementById("owner-add").hidden = false;
  const rego = document.getElementById("rego").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const colour = document.getElementById("colour").value;
  const owner = document.getElementById("owner").value;

  const personID = document.getElementById("personid").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const dob = document.getElementById("dob").value;
  const license = document.getElementById("license").value;
  const expire = document.getElementById("expire").value;

  if(personID == "" || name == "" || address == "" || dob == "" || license == ""
   || expire == "" || rego == "" || make == "" || model == "" || colour == "" || owner == "") {
    message.textContent = "Error - fields must all be filled";
    return;
  }
  
  const {error:personError} = await supabase.from("People").insert({
    PersonID: personID,
    Name: name,
    Address: address,
    DOB: dob,
    LicenseNumber: license,
    ExpiryDate: expire
  })
  const {error:vehicleError} = await supabase.from('Vehicles').insert({
    VehicleID: rego,
    Make: make,
    Model: model,
    Colour: colour,
    OwnerID: owner
  })
  message.textContent = "Vehicle added successfully";
  

}

async function addVehicle() {
  const rego = document.getElementById("rego").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const colour = document.getElementById("colour").value;
  const owner = document.getElementById("owner").value;

  const message = document.getElementById("message");

  if(owner == "") {
    document.getElementById("owner-add").hidden = false;
    message.textContent = "Error";
    return;
  }

  const {data:ownerData, error: ownerError} = await supabase.from('People').select().eq('PersonID', owner);
  console.log("owner: '" + owner + "'");
  if(rego == "" || make == "" || model == "" || colour == "") {
    message.textContent = "Error";
    return;
  }
  else if(ownerData != null && ownerData.length > 0) {
    console.log("here");
    const {error: insertError} = await supabase.from("Vehicles").insert({
      VehicleID: rego,
      Make: make,
      Model: model,
      Colour: colour,
      OwnerID: owner
    })
    return;
  }
  else {
    document.getElementById("owner-add").hidden = false;
    message.textContent = "Error";
    return;
  }
}

async function getVehicle() {
  const license = document.getElementById("rego");
  const licenseValue = license.value;

  if(licenseValue == "") {
    message.textContent = "Error, field is empty";
    return;
  }
  const {data: vehicleData, error:vehicleError} = await supabase.from('Vehicles').select().eq('VehicleID', licenseValue);
  if(vehicleData == null || vehicleData[0] == null) {
    message.textContent = "No result found";
    resultBox.textContent = "";
    return;
  }
  const {data: personData, error: personError} = await supabase.from('People').select().eq('PersonID', vehicleData[0].OwnerID);


  
  resultBox.textContent = "";

  const newDiv = document.createElement("div");
  const box = document.createElement("p");
  newDiv.appendChild(box);
  if(personError != null || personData == null)
    box.textContent = printVehicleData(vehicleData[0]) + "\n Owner Name: " + personData[0].Name + "\n License: " + personData[0].LicenseNumber;
  else box.textContent = printVehicleData(vehicleData[0]);
  resultBox.appendChild(box);

  
  const results = resultBox.querySelectorAll("p");
  if(results.length == 0) {
    message.textContent = "No result found";
  }
  else {
    message.textContent = "Search successful";
  }

  formatResults(results);

}

async function getPerson() {
  // get string from text boxes
  const name = document.getElementById("name");
  const nameValue = name.value;

  const license = document.getElementById("license");
  const licenseValue = license.value;

  if(licenseValue == "" && nameValue == "" || licenseValue != "" &&  nameValue != "") {
    message.textContent = "Error, exactly one box can be used at a time";
    return;
  }
  const {data: vehicleData, error:vehicleError} = await supabase.from('Vehicles').select().eq('VehicleID', licenseValue);
  const {data:personData, error:personError} = await supabase.from('People').select().ilike('Name', `%${nameValue}%`);   
  
  const resultBox = document.getElementById("results");
  resultBox.textContent = "";

  const personIDs = [];

  for(let i = 0; i < vehicleData.length; i++) {
    
    const idValue = vehicleData[i].OwnerID.value;
    console.log(vehicleData[i].OwnerID);
    const {data:vehiclePersonData, error: vehiclePersonError} = await supabase.from('People').select().eq('PersonID', vehicleData[i].OwnerID);

    

    for(let j = 0; j < vehiclePersonData.length; j++) {
      personIDs.push(vehiclePersonData[j].PersonID);
      const newDiv = document.createElement("div");
      const box = document.createElement("p");
      newDiv.appendChild(box);
      box.textContent = printPersonData(vehiclePersonData[j]);
      resultBox.appendChild(box);
    }
  }

  if(nameValue != "") {
    for(let j = 0; j < personData.length; j++) {
      var isElementAlreadyAdded = false;
      personIDs.forEach(element => {
        if(element == personData[j].PersonID) isElementAlreadyAdded = true;
      })
  
      if(isElementAlreadyAdded) continue;
      const newDiv = document.createElement("div");
      const box = document.createElement("p");
      newDiv.appendChild(box);
      box.textContent = printPersonData(personData[j]);
      console.log(printPersonData(personData[j]));
      resultBox.appendChild(newDiv);
    }
  }
  
  const results = resultBox.querySelectorAll("p");
  if(results.length == 0) {
    message.textContent = "No result found";
  }
  else if(licenseValue == "" && nameValue == "" || licenseValue != "" && nameValue != "") {
    message.textContent = "Error, cannot search both name and license number together.";
    resultBox.textContent = "";
  }
  else {
    message.textContent = "Search successful";
  }

  formatResults(results);
  
}

function formatResults(results) {
  results.forEach(element => {
    element.style.whiteSpace = "pre-line";
    element.style.borderColor = "black";
    element.style.borderStyle = "solid";
    element.style.borderWidth = "1px";
    element.style.padding = "10px";
    element.style.margin = "10px";
    element.style.display = "inline-block";
    element.style.textAlign = "left";
    element.style.width = "fit-content";
  });
}

function printPersonData(data) {
  return "Personid: " + data.PersonID +  "\n Name: " + data.Name 
    + "\n Address: " + data.Address + "\n DOB: " + data.DOB + "\n License Number: "
    + data.LicenseNumber + "\n Expiry Date: " + data.ExpiryDate;
    
}

function printVehicleData(data) {
  return "VehicleID: " + data.VehicleID + "\n Make: " + data.Make + "\n Model: " + data.Model + "\n Data: " + data.Colour;
}

/*   0: {VehicleID: 'GHT56FN', Make: 'Fiat', Model: 'Punto', Colour: 'Blue', OwnerID: 4}
1: {VehicleID: 'NG51PKO', Make: 'Ford', Model: 'Fiesta', Colour: 'Grey', OwnerID: 1}
2: {VehicleID: 'PQR6465', Make: 'Audi', Model: 'A4', Colour: 'Red', OwnerID: 2}
3: {VehicleID: 'SFD43FH', Make: 'Lancia', Model: 'Thema', Colour: 'Blue', OwnerID: 3}

*/
