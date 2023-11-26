using expernetic_api.models;
using System.ComponentModel.DataAnnotations.Schema;

namespace expernetic_api.Controllers.Dto
{
    public class TodoRequestDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public required string UserEmail { get; set; }
    }
}
