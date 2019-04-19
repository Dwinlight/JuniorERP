import {Injectable} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {ColiDTO} from '../DTOs/coliDTO';

@Injectable()
export class ColisService {
  db = firebase.firestore();
  colis: ColiDTO[] = [];
  colisSubject = new Subject<ColiDTO[]>();
  entreprises: number[] = [];
  constructor() {
    console.log('constructeur');
    this.getColis();
  }
  emitColis() {
    this.colisSubject.next(this.colis);
  }
  saveColis(newColi: ColiDTO) {
    let idNew;
    this.entreprises.sort();
    this.entreprises.length === 0 ?  idNew = 0 : idNew = this.entreprises.length;
    for (const e of this.entreprises) {
      //idNew > e[0]
    }
    console.log(idNew);
    this.db.collection('colis').doc('' + idNew ).set({
      idEntreprise: newColi.idEntreprise,
      idColi: idNew,
      arrivee: newColi.arrivee,
      depart: newColi.depart === '' ? 'N/A' : newColi.depart,
      codeArticle: newColi.codeArticle,
      remarque: newColi.remarque,
      designation: newColi.designation,
      emplacement: newColi.emplacement,
      marquage: newColi.marquage,
      numeroPalette: newColi.numeroPalette
    })
      .then(function(docRef) {
        console.log('Document written with ID: ' + docRef);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    this.entreprises.push(idNew);
    newColi.idColi = idNew;
    this.colis.push(newColi);
  }
  getColis() {
    // firebase.database().ref('/').on('value', (data: DataSnapshot) => {
    //  this.Colis = data.val() ? data.val() : [];
    //  this.emitColis();
    // });
    console.log('vide');
    this.db.collection('colis').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const coli = new ColiDTO();
        coli.idEntreprise = doc.get('idEntreprise');
        coli.idColi = doc.get('idColi');
        coli.arrivee = doc.get('arrivee');
        coli.depart = doc.get('depart');
        coli.codeArticle = doc.get('codeArticle');
        coli.remarque = doc.get('remarque');
        coli.designation = doc.get('designation');
        coli.emplacement = doc.get('emplacement');
        coli.marquage = doc.get('marquage');
        coli.numeroPalette = doc.get('numeroPalette');
        this.entreprises.push(+ doc.get('id'));
        console.log(coli);
        this.colis.push(coli);
      });
    });
  }
  getSingleColi(id: number) {
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
  createNewColi(newClient: ColiDTO) {
    this.saveColis(newClient);
    this.emitColis();
  }
  removeColi(coli: ColiDTO) {
    this.db.collection('Colis').doc('' + coli.idColi ).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
    this.entreprises.splice(this.entreprises.indexOf(coli.idColi), 1);
    this.colis.splice(this.colis.indexOf(coli), 1);
  }

  modifyColi(oldColi: ColiDTO, newColi: ColiDTO) {
    console.log(oldColi.idColi);
    newColi.idColi = oldColi.idColi;
    this.db.collection('Colis').doc('' + oldColi.idColi).update({
      idEntreprise: newColi.idEntreprise,
      idColi: newColi.idColi,
      arrivee: newColi.arrivee,
      depart: newColi.depart === '' ? 'N/A' : newColi.depart,
      codeArticle: newColi.codeArticle,
      remarque: newColi.remarque,
      designation: newColi.designation,
      emplacement: newColi.emplacement,
      marquage: newColi.marquage,
      numeroPalette: newColi.numeroPalette
    })
      .then(function(docRef) {
        console.log('Document written with ID: ');
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    this.colis.push(newColi);
    this.colis.splice(this.colis.indexOf(oldColi), 1);
    this.emitColis();
  }
}
