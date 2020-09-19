import { Timestamp } from "rxjs-compat";

export interface IClient {
    firstName: string,
    lastName: string,
    mail: string,
    identityDocument: string,
    status: string,
    telephone: string | null,
    address: string | null,
    modificationDate: string | null,
    id: number,
    creationDate: string
}