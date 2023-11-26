Todo Application
This is a Todo application with CRUD operations developed using C# and .NET technologies for the backend. The backend is built using .NET Core, and an SQLite database is integrated with Entity Framework for storing and managing Todo data. The application includes proper error handling and validation for API requests.

The frontend is built using a technology of your choice (e.g., React), running on port 3000, and communicates with the backend API hosted on port 7049.

Backend Setup
Clone the Repository:

bash
Copy code
https://github.com/ImalshaRC/expernetic-app.git
Navigate to the Backend Directory:

bash
Copy code
cd todo-app/backend
Install Dependencies:

bash
Copy code
dotnet restore
Update Database:

bash
Copy code
dotnet ef migrations add Initials
Update Database:

bash
Copy code
dotnet ef database update
Run the Backend:

bash
Copy code
dotnet run
The backend will be running on http://localhost:7049.

Swagger Document
https://localhost:7049/swagger/index.html - All the end point details

Frontend Setup
Navigate to the Frontend Directory:

bash
Copy code
cd todo-app/frontend
Install Dependencies:

bash
Copy code
npm install
Run the Frontend:

bash
Copy code
npm start
The frontend will be running on http://localhost:3000.
