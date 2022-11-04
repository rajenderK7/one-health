export interface SessionModel {
  sessionID: string;
  userID: string;
  doctorID: string;
  diagnosticID: string;
  userName: string;
  doctorName: string;
  symptoms: string;
  active: boolean;
  complete: number;
  meetLink: string;
  paymentLink: string;
  prescriptionDownloadLink?: string;
  paymentDone: boolean;
}
