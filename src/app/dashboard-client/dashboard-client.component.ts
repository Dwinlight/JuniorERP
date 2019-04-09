import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subscription} from 'rxjs';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit, OnDestroy {
  index: number = null;
  clients: ClientDTO[];
  clientsSubscription: Subscription;
  isCreated = false;
  isModify = false;
  clientNull: ClientDTO;

  constructor(private clientsService: ClientService, private  router: Router) {
    this.clientNull = new ClientDTO();
    this.clientNull.entreprise = '';
    this.clientNull.interlocuteur = '';
    this.clientNull.mail = '';
    this.clientNull.telephone = '';
    this.clientNull.adresse = '';
    this.clientNull.remarque = '';
  }

  ngOnInit() {
    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: ClientDTO[]) => {
        this.clients = clients;
      }
    );
    this.clientsService.emitClients();
  }

  onNewClient() {
    this.isCreated = true;
    // this.router.navigate(['/client']);
  }


  onViewClient(index: number) {
    this.index = index;
  }

  onRemove(client: ClientDTO) {
    this.clientsService.removeClient(client);
    alert('Client ' + client.entreprise + ' a bien été supprimé');
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

  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }

}
