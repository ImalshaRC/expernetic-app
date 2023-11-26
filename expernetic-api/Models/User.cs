using System.ComponentModel.DataAnnotations;

namespace expernetic_api.models
{
    public class User
    {
        [Key]
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;        
        public string Password { get; set; } = string.Empty;
    }
}
