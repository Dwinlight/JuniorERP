import {Injectable} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {ColiDTO} from '../DTOs/coliDTO';

@Injectable()
export class ColisService {
  db = firebase.firestore();
  colis: ClientDTO[] = [];
  clientsSubject = new Subject<ClientDTO[]>();
  entreprises: number[] = [];
  constructor() {
    this.getColis();
  }
  emitClients() {
    this.clientsSubject.next(this.colis);
  }
  saveColis(newClient: ColiDTO) {
    let idNew;
    this.entreprises.sort();
    this.entreprises.length === 0 ?  idNew = 0 : idNew = this.entreprises[this.entreprises.length - 1] + 1;
    this.db.collection('colis').doc('' + idNew ).set({
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
    this.Colis.push(newClient);
  }
  getColis() {
    // firebase.database().ref('/').on('value', (data: DataSnapshot) => {
    //  this.Colis = data.val() ? data.val() : [];
    //  this.emitColis();
    // });
    this.db.collection('Colis').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const client = new ColiDTO();
        client.remarque = doc.get('remarque');
        client.adresse = doc.get('adresse');
        client.telephone = doc.get('telephone');
        client.mail = doc.get('mail');
        client.interlocuteur = doc.get('interlocuteur');
        client.entreprise = doc.get('entreprise');
        client.id = doc.get('id');
        this.entreprises.push(+ doc.get('id'));
        this.Colis.push(client);
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
  createNewClient(newClient: ColiDTO) {
    this.saveColis(newClient);
    this.emitColis();
  }
  removeClient(client: ColiDTO) {
    this.db.collection('Colis').doc('' + client.id ).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
    this.entreprises.splice(this.entreprises.indexOf(client.id), 1);
    this.Colis.splice(this.Colis.indexOf(client), 1);
  }

  modifyColis(oldClient: ColiDTO, newClient: ColiDTO) {
    console.log(oldClient.id);
    newClient.id = oldClient.id;
    this.db.collection('Colis').doc('' + oldClient.id).update({
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
    this.Colis.push(newClient);
    this.Colis.splice(this.clients.indexOf(oldClient), 1);
    this.emitClients();
  }
}
