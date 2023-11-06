public class ReservaTransporte
{
public int    Id {get;set;}
public Transporte TransporteReservado{get;set;}
public string Descripcion{get;set;}
public int    Capacidad {get;set;}
public double    PrecioBase {get;set;}

public Cliente cliente {get;set;}
public DateTime FechaIncio {get;set;}
public DateTime FechaFin {get;set;}
public double PrecioTotal {get;set;}
public string Estado  {get;set;}
}