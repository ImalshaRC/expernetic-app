using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace expernetic_api.models
{
    public class Todo
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Completed { get; set; } = false;

        //[ForeignKey("User")]
        //public required string UserEmail { get; set; }
        //public required User User { get; set; }
    }
}
