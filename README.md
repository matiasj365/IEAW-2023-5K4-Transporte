# IEAW-2023-5K4 - Sistema Integral de Gestión Turística  
## Microservicio de Gestión de Transporte (Grupo 3):
- Responsabilidades: Administrar información sobre servicios de transporte, como alquiler de coches, traslados, y reservas de transporte.
- Endpoints:
    - GET/POST/PUT/DELETE /transporte
    - GET/POST /reservas-transporte
    - GET /clientes/{id_cliente}/reservas-transporte
- Modelo:   

-  Relación con otro microservicio:
    - Integración de Aplicaciones en Entorno Web
    - Se relaciona con la Gestión de Clientes al recibir y gestionar las reservas realizadas por los clientes
