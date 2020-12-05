using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MapAngular.DataAccess
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MapContext>
    {
        public MapContext CreateDbContext(string[] args)
        {
            return new MapContext(new DbContextOptionsBuilder<MapContext>()
                .UseSqlite("Data Source = store.sqlite3")
                .Options);
        }
    }
}
