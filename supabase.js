  // After install the supabase-js module
  import { createClient } from
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
  // Create a single supabase client for interacting with your database
  const supabase = createClient('https://nvdcopccmmupvigzaxai.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZGNvcGNjbW11cHZpZ3pheGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDQyMzgsImV4cCI6MjAyOTQ4MDIzOH0.YkI4-92d2MqBkofnSvWphUfhS3_TfZWkGgOfv76cJcY')
  

  const button = document.querySelector("button");

  button.addEventListener("click", createParagraph);

  // Fetch data from the table
  async function fetchData() {
      const { data, error } = await supabase.from('People').select();
      console.log('Fetched data:'
      , data);
      //createParagraph();
  }
  function createParagraph() {
    button.textContent = "changed!";
    const para = document.body.createElement("p");
    para.textContent = "You clicked the button!";
    document.body.appendChild(para);
    alert("button has been pressed")
  }



  // Call the fetchData function to retrieve data
  fetchData();