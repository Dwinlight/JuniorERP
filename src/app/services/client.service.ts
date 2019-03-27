import {Injectable} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class ClientService {
  clients: ClientDTO[] = [];
  clientsSubject = new Subject<ClientDTO[]>();
  constructor() {
    this.getClients();
  }
  emitClients() {
    this.clientsSubject.next(this.clients);
  }
  saveClients() {
    firebase.database().ref('/').set(this.clients);
  }
  getClients() {
    firebase.database().ref('/').on('value', (data: DataSnapshot) => {
      this.clients = data.val() ? data.val() : [];
      this.emitClients();
    });
  }
  getSingleClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewClient(newClient: ClientDTO) {
    this.clients.push(newClient);
    this.saveClients();
    this.emitClients();
  }
  removeBook(client: ClientDTO) {
    const bookIndexToRemove = this.clients.findIndex(
      (clientEl) => {
        if (clientEl === client) {
          return true;
        }
      }
    );
    this.clients.splice(bookIndexToRemove, 1);
    this.saveClients();
    this.emitClients();
  }
}
