import {Injectable} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class ClientService {
  clients: ClientDTO[] = [];
  client1 = new ClientDTO();
  client2 = new ClientDTO();

  clientsSubject = new Subject<ClientDTO[]>();
  constructor() {
    this.client1.id = 1;
    this.client1.interlocuteur = 'jean';
    this.client1.entreprise = 'apicil';
    this.client1.remarque = 'cool';
    this.client1.adresse = 'caluire';
    this.client1.telephone = '118';
    this.client1.mail = 'jean@apicil.com';
    this.clients.push(this.client1);
    this.getClients();
  }
  emitClients() {
    this.clientsSubject.next(this.clients);
  }
  saveClients() {
    firebase.database().ref('/').set(this.clients);
  }
  getClients() {
    // firebase.database().ref('/').on('value', (data: DataSnapshot) => {
     // this.clients = data.val() ? data.val() : [];
      this.emitClients();
    //});
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
