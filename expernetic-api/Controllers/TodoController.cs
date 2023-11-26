// Importing necessary namespaces
using expernetic_api.Controllers.Dto;
using expernetic_api.Data;
using expernetic_api.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// Defining the namespace and class for the TodoController
namespace expernetic_api.Controllers
{
    // Attribute to define the route, specify that this class is a controller, and require authorization for all actions
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TodoController : ControllerBase
    {
        // Private field to store the database context
        private readonly DataContext _context;

        // Constructor to initialize the database context through dependency injection
        public TodoController(DataContext context)
        {
            _context = context;
        }

        // Action method for adding a new todo item
        [HttpPost]
        public async Task<ActionResult<List<Todo>>> AddTodo(Todo todo)
        {
            // Adding the new todo to the database
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            // Returning the updated list of todos
            return Ok(await _context.Todos.ToListAsync());
        }

        // Action method for getting all todo items
        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetAllTodos()
        {
            // Returning the list of all todos
            return Ok(await _context.Todos.ToListAsync());
        }

        // Action method for getting a todo item by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodoById(Guid id)
        {
            // Retrieving the todo from the database by ID
            var todo = await _context.Todos.FindAsync(id);

            // Returning a not found response if the todo is not found
            if (todo == null)
            {
                return NotFound();
            }

            // Returning the todo item
            return Ok(todo);
        }

        // Action method for deleting a todo item by its ID
        [HttpDelete("{id}")]
        public async Task<ActionResult<Todo>> DeleteTodoById(Guid id)
        {
            // Retrieving the todo from the database by ID
            var todo = await _context.Todos.FindAsync(id);

            // Returning a not found response if the todo is not found
            if (todo == null)
            {
                return NotFound();
            }

            // Removing the todo from the database and saving changes
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            // Returning a no content response
            return NoContent();
        }

        // Action method for updating the completed status of a todo item by its ID
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTodoCompletedStatus(Guid id, [FromBody] CompletedStatusDto completedStatus)
        {
            // Retrieving the todo from the database by ID
            var todo = await _context.Todos.FindAsync(id);

            // Returning a not found response if the todo is not found
            if (todo == null)
            {
                return NotFound();
            }

            // Updating the completed status and saving changes
            todo.Completed = completedStatus.Completed;
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();

            // Returning a no content response
            return NoContent();
        }

        // Action method for updating a todo item by its ID
        [HttpPut("{id}")]
        public async Task<ActionResult<Todo>> UpdateTodo(Guid id, [FromBody] Todo todo)
        {
            // Retrieving the todo from the database by ID
            var localTodo = await _context.Todos.FindAsync(id);

            // Returning a not found response if the todo is not found
            if (localTodo == null)
            {
                return NotFound();
            }

            // Updating the properties of the todo and saving changes
            localTodo.Title = todo.Title;
            localTodo.Description = todo.Description;
            localTodo.Completed = todo.Completed;

            _context.Todos.Update(localTodo);
            await _context.SaveChangesAsync();

            // Returning a no content response
            return NoContent();
        }
    }
}
