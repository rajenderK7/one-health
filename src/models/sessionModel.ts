export interface SessionModel {
  sessionID: string;
  userID: string;
  doctorID: string;
  diagnosticID: string;
  userName: string;
  doctorName: string;
  userMail: string;
  doctorMail: string;
  symptoms: string;
  active: boolean;
  complete: number;
  meetLink: string;
  paymentLink: string;
  consultationFee: string;
  prescriptionDownloadLink?: string;
  paymentDone: boolean;
}
