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
  entreprises: string[] = [];
  constructor() {
    this.getClients();
  }
  emitClients() {
    this.clientsSubject.next(this.clients);
  }
  saveClients(oldClient: ClientDTO, newClient: ClientDTO) {
    if (oldClient !== null ) {
      if (oldClient.entreprise !== newClient.entreprise) {
        if (this.entreprises.includes(newClient.entreprise.toUpperCase())) {
          throw alert('Entreprise déjà existante');
        }
      }
    }
    console.log(newClient.entreprise.toUpperCase());
    console.log(this.entreprises);
    if (this.entreprises.includes(newClient.entreprise.toUpperCase())) {
      console.log('Already exists');
      alert(newClient.entreprise + ' existe déjà dans votre liste de client');
    } else {
      // firebase.database().ref('/').set(this.clients);
      this.db.collection('clients').doc(newClient.entreprise).set({
        entreprise: newClient.entreprise,
        interlocuteur: newClient.interlocuteur,
        mail: newClient.mail,
        telephone: newClient.telephone,
        adresse: newClient.adresse,
        remarque: newClient.remarque
      })
        .then(function(docRef) {
          console.log('Document written with ID: ');
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
      this.entreprises.push(newClient.entreprise.toUpperCase());
      this.clients.push(newClient);
    }
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
        this.entreprises.push(doc.get('entreprise').toUpperCase());
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
    this.saveClients(null, newClient);
    this.emitClients();
  }
  modifyOldClient(oldClient: ClientDTO, newClient: ClientDTO) {
    this.saveClients(oldClient, newClient);
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
    this.saveClients(null, client);
    this.emitClients();
  }

  modifyClients(oldClient: ClientDTO, newClient: ClientDTO) {
    if (oldClient.entreprise !== newClient.entreprise){
      if (this.entreprises.includes(newClient.entreprise.toUpperCase())){
        throw alert('Entreprise déjà existante');
      }
    }
    console.log(newClient.entreprise.toUpperCase());
    console.log(this.entreprises);
    // firebase.database().ref('/').set(this.clients);
    this.db.collection('clients').doc(newClient.entreprise).set({
      entreprise: newClient.entreprise,
      interlocuteur: newClient.interlocuteur,
      mail: newClient.mail,
      telephone: newClient.telephone,
      adresse: newClient.adresse,
      remarque: newClient.remarque
    })
      .then(function(docRef) {
        console.log('Document written with ID: ');
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    this.entreprises.push(newClient.entreprise.toUpperCase());
    this.clients.push(newClient);

  }
}
