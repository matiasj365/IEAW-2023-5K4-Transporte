using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace APIEstudiantes.Controllers;

[ApiController]
[Route("api/estudiante")]
public class TransporteController : ControllerBase
{
    public static List<Estudiante> estudiantes = new List<Estudiante>() { };

    private readonly ILogger<EstudiantesController> _logger;

    public EstudiantesController(ILogger<EstudiantesController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetEstudiantes")]
    public IEnumerable<Estudiante> Get()
    {
        return estudiantes;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Estudiante> Get(int id)
    {
        int estudianteIndex = estudiantes.FindIndex(r => r.Id == id);
        if (estudianteIndex < 0)
        {
            return NotFound();
        }
        return estudiantes[estudianteIndex];
    }


    [HttpPost(Name = "PostEstudiantes")]
    public void Post(Estudiante estudiante)
    {
        estudiante.Id = 1;
        if (estudiantes.Count > 0)
            estudiante.Id = estudiantes.Max(r => r.Id) + 1;
        estudiantes.Add(estudiante);
    }

    [HttpPut("{id}",Name = "PutEstudiantes")]
    public ActionResult Put(int id, Estudiante estudiante)
    {
        int estudianteIndex = estudiantes.FindIndex(r => r.Id == id);
        if (estudianteIndex < 0)
        {
            return NotFound();
        }
        estudiantes[estudianteIndex] = estudiante;
        return new EmptyResult();
    }
    [HttpDelete("{id}",Name = "DeleteEstudiantes")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult Delete(int id)
    {
        int estudianteIndex = estudiantes.FindIndex(r => r.Id == id);
        if (estudianteIndex < 0)
        {
            return NotFound();
        }
        estudiantes.RemoveAt(estudianteIndex);
        return new EmptyResult();
    }
}