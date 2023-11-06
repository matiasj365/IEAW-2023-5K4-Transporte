using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace APITransporte.Controllers;

[ApiController]
[Route("transporte")]
public class TransporteController : ControllerBase
{
    public static List<Transporte> transportes = new List<Transporte>() { };

    private readonly ILogger<TransporteController> _logger;

    public TransporteController(ILogger<TransporteController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetTransportes")]
    public IEnumerable<Transporte> Get()
    {
        return transportes;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Transporte> Get(int id)
    {
        int transporteIndex = transportes.FindIndex(r => r.Id == id);
        if (transporteIndex < 0)
        {
            return NotFound();
        }
        return transportes[transporteIndex];
    }


    [HttpPost(Name = "PostTransportes")]
    public void Post(Transporte transporte)
    {
        transporte.Id = 1;
        if (transportes.Count > 0)
            transporte.Id = transportes.Max(r => r.Id) + 1;
        transportes.Add(transporte);
    }

    [HttpPut("{id}",Name = "PutTransportes")]
    public ActionResult Put(int id, Transporte transporte)
    {
        int transporteIndex = transportes.FindIndex(r => r.Id == id);
        if (transporteIndex < 0)
        {
            return NotFound();
        }
        transportes[transporteIndex] = transporte;
        return new EmptyResult();
    }
    [HttpDelete("{id}",Name = "DeleteTransportes")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult Delete(int id)
    {
        int transporteIndex = transportes.FindIndex(r => r.Id == id);
        if (transporteIndex < 0)
        {
            return NotFound();
        }
        transportes.RemoveAt(transporteIndex);
        return new EmptyResult();
    }
}