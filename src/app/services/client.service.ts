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
  entreprises: number[] = [];
  constructor() {
    console.log('SAV');
    this.getClients();
  }
  emitClients() {
    this.clientsSubject.next(this.clients);
  }
  saveClients(newClient: ClientDTO) {
    let idNew;
    this.entreprises.sort();
    this.entreprises.length === 0 ?  idNew = 0 : idNew = this.entreprises[this.entreprises.length - 1] + 1;
    this.db.collection('clients').doc('' + idNew ).set({
      entreprise: newClient.entreprise,
      interlocuteur: newClient.interlocuteur,
      mail: newClient.mail,
      telephone: newClient.telephone,
      adresse: newClient.adresse,
      remarque: newClient.remarque,
      id: idNew
    })
      .then(function(docRef) {
        console.log('Document written with ID: ' + docRef);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    this.entreprises.push(idNew);
    newClient.id = idNew;
    this.clients.push(newClient);
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
        client.id = doc.get('id');
        this.entreprises.push(+ doc.get('id'));
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
    this.saveClients(newClient);
    this.emitClients();
  }
  removeClient(client: ClientDTO) {
    this.db.collection('clients').doc('' + client.id ).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
    this.entreprises.splice(this.entreprises.indexOf(client.id), 1);
    this.clients.splice(this.clients.indexOf(client), 1);
  }

  modifyClients(oldClient: ClientDTO, newClient: ClientDTO) {
    console.log(oldClient.id);
    newClient.id = oldClient.id;
    this.db.collection('clients').doc('' + oldClient.id).update({
      entreprise: newClient.entreprise,
      interlocuteur: newClient.interlocuteur,
      mail: newClient.mail,
      telephone: newClient.telephone,
      adresse: newClient.adresse,
      remarque: newClient.remarque,
      id: newClient.id
    })
      .then(function(docRef) {
        console.log('Document written with ID: ');
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    this.clients.push(newClient);
    this.clients.splice(this.clients.indexOf(oldClient), 1);
    this.emitClients();
  }
}
