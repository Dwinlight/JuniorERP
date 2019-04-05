import {Injectable} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class ClientService {
  db = firebase.firestore();
  clients: ClientDTO[] = [];
  clientsSubject = new Subject<ClientDTO[]>();
  constructor() {
    this.getClients();
  }
  emitClients() {
    this.clientsSubject.next(this.clients);
  }
  saveClients(newClient: ClientDTO) {
    // firebase.database().ref('/').set(this.clients);
    this.db.collection('clients').add({
      entreprise: newClient.entreprise,
      interlocuteur: newClient.interlocuteur,
      mail: newClient.mail,
      telephone: newClient.telephone,
      adresse: newClient.adresse,
      remarque: newClient.remarque
    })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }
  getClients() {
    // firebase.database().ref('/').on('value', (data: DataSnapshot) => {
    //  this.clients = data.val() ? data.val() : [];
    //  this.emitClients();
    // });
    this.db.collection('clients').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const client = new ClientDTO();
        client.remarque = doc.get('remarque');
        client.adresse = doc.get('adresse');
        client.telephone = doc.get('telephone');
        client.mail = doc.get('mail');
        client.interlocuteur = doc.get('interlocuteur');
        client.entreprise = doc.get('entreprise');
        this.clients.push(client);
      });
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
    this.saveClients(newClient);
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
    this.saveClients(client);
    this.emitClients();
  }
}
