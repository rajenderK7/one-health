import { GeoPoint } from "firebase/firestore";

export default interface DiagnosticModel {
  forEach(arg0: (dia: any) => Promise<void>): unknown;
  uid: string;
  name: string;
  address: string;
  location:string[];
  tests:object[],
}
