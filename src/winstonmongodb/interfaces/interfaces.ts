export interface LoggerPayload {
  serviceName: string;
  serviceMethod: string;
  message: string;
  trace?: string; // Opcional en caso de métodos como info o warn
}

// export interface LoggerPayload {
//   serviceName: string;
//   serviceMethod: string;
//   message: string;
//   stackTrace?: string;
//   userId?: string;
//   ip?: string;
//   context?: string;
// }
