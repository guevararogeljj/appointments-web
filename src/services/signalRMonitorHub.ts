import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';


const connection: HubConnection = new HubConnectionBuilder()
  .withUrl('https://localhost:7001/monitorHub')
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build();

// Logs para eventos clave
connection.onclose((error) => {
  console.log('[SignalR] Conexión cerrada', error);
});

connection.onreconnecting((error) => {
  console.log('[SignalR] Reintentando conexión...', error);
});

connection.onreconnected((connectionId) => {
  console.log('[SignalR] Reconectado. ConnectionId:', connectionId);
});

console.log('[SignalR] Instancia de conexión creada');

export default connection;