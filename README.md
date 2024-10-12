# COMP1004 Coursework - Vehicle details Website with database backend

Coursework for Databases and Interfaces module, allowing interaction with vehicle database.

## Functionality

3 Pages, each with a different function in relation to the database.
### People Search
Search for a person in the database using their name or their driving license number. All matches with be listed.

### Vehicle Search
Search for a vehicle using a vehicle registration number. Details of the car (type, colour etc.) will be shown, along with the owner's name and license number.

### Add Vehicle
Details for a new vehicle may be added. This will include registration number, make, model and colour, as well as its owner. If the owner exists in the database, 
they will be selected and assigned to the new vehicle, if not, their details may be entered by the user and the owner will be added to the database along with the vehicle.

## Technologies:
Front end implemented with HTML, CSS and Javascript.
Back end implemented using Supabase, using the REST API, connected through its JavaScript client.

