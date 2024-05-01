  // After install the supabase-js module
  import { createClient } from
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
  // Create a single supabase client for interacting with your database
  const supabase = createClient('https://nvdcopccmmupvigzaxai.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZGNvcGNjbW11cHZpZ3pheGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDQyMzgsImV4cCI6MjAyOTQ4MDIzOH0.YkI4-92d2MqBkofnSvWphUfhS3_TfZWkGgOfv76cJcY')
  

  const button = document.querySelector("button");
  console.log(button.id);
  button.addEventListener("click", getVehicle);

  // Fetch data from the table
  async function fetchData() {
      const { data, error } = await supabase.from('People').select();
      console.log('Fetched data:'
      , data);
      //createParagraph();
  }
  async function getVehicle() {
    // get string from text boxes
    const input = document.getElementById("Registration");
    const value = input.value;
    console.log("fetched reg: ", value);

    const {data, error} = await supabase.from('Vehicles').select().eq('VehicleID', value);
    console.log("fetched data: ", data.VehicleID);
    var resultBox = document.getElementById("results");
    for(let i = 0; i < data.length; i++) {
      console.log(i);
      var text = document.createTextNode(data[i].Make + ", ");
      resultBox.appendChild(text);
    }
    
  }

/*   0: {VehicleID: 'GHT56FN', Make: 'Fiat', Model: 'Punto', Colour: 'Blue', OwnerID: 4}
1: {VehicleID: 'NG51PKO', Make: 'Ford', Model: 'Fiesta', Colour: 'Grey', OwnerID: 1}
2: {VehicleID: 'PQR6465', Make: 'Audi', Model: 'A4', Colour: 'Red', OwnerID: 2}
3: {VehicleID: 'SFD43FH', Make: 'Lancia', Model: 'Thema', Colour: 'Blue', OwnerID: 3}

 */

  // Call the fetchData function to retrieve data
  fetchData();