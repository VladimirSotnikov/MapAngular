using System.ComponentModel.DataAnnotations;

namespace MapAngular.DataAccess
{
    public class Place
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Latitude { get; set; }
        [Required]
        public string Longitude { get; set; }
    }
}
