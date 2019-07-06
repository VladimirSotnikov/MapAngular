using Microsoft.EntityFrameworkCore;

namespace MapAngular.DataAccess
{
    public class MapContext : DbContext
    {
        public DbSet<Place> Places { get; set; }

        public MapContext(DbContextOptions<MapContext> options) : base(options) { }
    }
}
