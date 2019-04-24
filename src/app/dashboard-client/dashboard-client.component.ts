import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subscription} from 'rxjs';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ColiDTO} from '../DTOs/coliDTO';
import {ColisService} from '../services/colis.service';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  index: number = null;
  clients: ClientDTO[];
  backUpClients: ClientDTO[];
  clientsSubscription: Subscription;
  colisSubscription: Subscription;
  isCreated = false;
  isModify = false;
  clientNull: ClientDTO;
  colis: ColiDTO[] = [];
  nbrColis: number[];
  ok = false;
  constructor(private colisService: ColisService, private formBuilder: FormBuilder, private clientsService: ClientService, private  router: Router) {
    this.clientNull = new ClientDTO();
    this.clientNull.entreprise = '';
    this.clientNull.interlocuteur = '';
    this.clientNull.mail = '';
    this.clientNull.telephone = '';
    this.clientNull.adresse = '';
    this.clientNull.remarque = '';
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      search: ['']
    });
    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: ClientDTO[]) => {
        this.clients = clients;
        this.backUpClients = clients;
      }
    );
    this.clientsService.emitClients();

    this.colisSubscription = this.colisService.colisSubject.subscribe(
      (colis: ColiDTO[]) => {
        this.colis = colis;
      }
    );
    this.colisService.emitColis();
  }

  onNewClient() {
    this.isCreated = true;
    // this.router.navigate(['/client']);
  }


  onViewClient(client: ClientDTO) {
    console.log(this.colis);
    this.index = this.clients.indexOf(client);
  }

  getNumber() {
    this.nbrColis =  new Array(this.clients.length).fill(0);
    for (let i = 0; i < this.colis.length; i++) {
      console.log('ok');
      if (this.colis[i].depart !== 'N/A') {
        const dateString = this.colis[i].depart.split('-');
        const departDate = new Date(+dateString[0], +dateString[1], +dateString[2]);
        const today = new Date();
        if (departDate > today) {
          this.nbrColis[this.colis[i].idEntreprise]++;
        }
      } else {
        this.nbrColis[this.colis[i].idEntreprise]++;
      }
    }
    console.log(this.nbrColis);
  }
  onRemove(client: ClientDTO) {
    this.clientsService.removeClient(client);
    alert('Client ' + client.entreprise + ' a bien été supprimé');
    this.backUpClients = this.clients;
    this.signupForm = this.formBuilder.group({
      search: ['']
    });
    this.index = null;
  }
  onBackDashboard() {
    console.log('back');
    this.index = null;
    this.isCreated = false;
    this.isModify = false;
  }
  onModify() {
    console.log('modify');
    this.isModify = true;
    this.isCreated = false;
  }

  search(key: string) {
    this.backUpClients = [];
    if (key === '') {
      this.backUpClients = this.clients;
    } else {

      for (const value of this.clients) {
        console.log(key);
        console.log(value.entreprise);
        if (value.entreprise.toLowerCase().search(key.toLowerCase()) !== -1) {
          this.backUpClients.push(value);
        }
      }
    }
  }


  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }
  onSubmit() {
    this.search(this.signupForm.get('search').value);
  }

}
