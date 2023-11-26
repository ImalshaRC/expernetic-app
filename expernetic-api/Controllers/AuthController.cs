// Importing necessary namespaces
using expernetic_api.Controllers.Dto;
using expernetic_api.Data;
using expernetic_api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// Defining the namespace and class for the controller
namespace expernetic_api.Controllers
{
    // Attribute to define the route and specify that this class is a controller
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Private fields to store configuration and database context
        private readonly IConfiguration _config;
        private readonly DataContext _context;

        // Constructor to initialize the configuration and database context through dependency injection
        public AuthController(IConfiguration config, DataContext context)
        {
            _context = context;
            _config = config;
        }

        // Action method for handling user registration
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] User user)
        {
            // Checking if the user with the given email already exists
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (currentUser != null)
            {
                // Returning a conflict response if the user already exists
                return Conflict("Given User Email Already Available");
            }

            // Adding the new user to the database
            _context.Users.Add(user);

            try
            {
                // Save the changes to the database
                await _context.SaveChangesAsync();

                // Return a successful response if registration is successful
                return Ok("User Registered Successfully");
            }
            catch (Exception ex)
            {
                // Return an error response if an exception occurs during registration
                return StatusCode(500, "An error occurred during user registration.");
            }
        }

        // Action method for handling user login
        [HttpPost("login")]
        public ActionResult Login([FromBody] UserLogin userLogin)
        {
            // Authenticating the user
            var user = Authenticate(userLogin);

            if (user != null)
            {
                // Generating a JWT token if authentication is successful
                var token = Generate(user);
                return Ok(token);
            }

            // Return a not found response if authentication fails
            return NotFound("Please Check Email and Password");
        }

        // Method to generate a JWT token for the authenticated user
        private string Generate(User user)
        {
            // Retrieving the JWT key from configuration
            string jwtKey = _config["JWTSettings:Key"] ?? throw new InvalidOperationException("JWT key is null. Please check your configuration.");

            // Creating a symmetric security key using the JWT key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Defining the claims for the user
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.FullName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Creating a JWT token with specified settings
            var token = new JwtSecurityToken(
                _config["JWTSettings:Issuer"],
                _config["JWTSettings:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );

            // Writing the token as a string and returning it
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Method to authenticate a user based on login credentials
        private User? Authenticate(UserLogin userLogin)
        {
            // Retrieving the user from the database based on email and password
            var currentUser = _context.Users.FirstOrDefault(o => o.Email == userLogin.Email && o.Password == userLogin.Password);

            // Returning the authenticated user, or null if authentication fails
            return currentUser;
        }

        // Method to verify if the user details are valid for registration
        private bool verifyRegister(User user)
        {
            // Checking if the user object and its properties are not null
            if (user != null)
            {
                if (user.Email == null || user.Password == null || user.FullName == null)
                {
                    // Returning true if any required property is null
                    return true;
                }

                // Returning false if all required properties are present
                return false;
            }

            // Returning false if the user object is null
            return false;
        }
    }
}
