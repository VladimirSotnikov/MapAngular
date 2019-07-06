using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MapAngular.DataAccess;
using MapAngular.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MapAngular.Controllers
{
    [Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly MapContext _context;

        public PlacesController(MapContext context)
        {
            _context = context;
        }

        [HttpGet]
        public Task<List<PlaceDto>> GetPlaces()
        {
            return _context.Places.Select(p => new PlaceDto
            {
                Id = p.Id,
                Latitude = p.Latitude,
                Longitude = p.Longitude,
                Name = p.Name,
            }).ToListAsync();
        }

        [HttpGet]
        public Task<PlaceDto> GetPlace(int id)
        {
            return _context.Places
                .Where(p => p.Id == id)
                .Select(p => new PlaceDto
                {
                    Id = p.Id,
                    Latitude = p.Latitude,
                    Longitude = p.Longitude,
                    Name = p.Name,
                })
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<PlaceDto> AddPlace(PlaceDto dto)
        {
            var place = new Place
            {
                Name = dto.Name,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
            };

            _context.Places.Add(place);
            await _context.SaveChangesAsync();

            return new PlaceDto
            {
                Id = place.Id,
                Name = place.Name,
                Longitude = place.Longitude,
                Latitude = place.Latitude,
            };
        }

        [HttpPut]
        public async Task<PlaceDto> UpdatePlace(PlaceDto dto)
        {
            var place = await _context.Places.FindAsync(dto.Id);

            place.Name = dto.Name;
            place.Latitude = dto.Latitude;
            place.Longitude = dto.Longitude;

            await _context.SaveChangesAsync();

            return new PlaceDto
            {
                Id = place.Id,
                Name = place.Name,
                Longitude = place.Longitude,
                Latitude = place.Latitude,
            };
        }

        [HttpDelete]
        public Task DeletePlace(int id)
        {
            _context.Places.Remove(_context.Places.Find(id));
            return _context.SaveChangesAsync();
        }
    }
}
