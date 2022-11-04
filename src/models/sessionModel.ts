export interface SessionModel {
  sessionID: string;
  userID: string;
  userName: string;
  userEmail:string;
  symptoms: string;
  doctorID: string;
  doctorName: string;
  doctorEmail:string;
  diagnosticID: string;
  active: boolean;
  complete: number;
  meetLink: string;
  paymentLink: string;
  prescriptionDownloadLink?: string;
  paymentDone: boolean;
}
