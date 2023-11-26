using expernetic_api.models;
using Microsoft.EntityFrameworkCore;

namespace expernetic_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
            
        }

        public DbSet<Todo> Todos { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
