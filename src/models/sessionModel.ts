export interface SessionModel {
  sessionID: string;
  userID: string;
  doctorID: string;
  userName: string;
  doctorName: string;
  symptoms: string;
  active: boolean;
  complete: number;
  meetLink:string,
  prescriptionDownloadLink?: string;
}
