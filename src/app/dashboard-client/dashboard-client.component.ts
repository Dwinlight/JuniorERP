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
  index: number;
  isSingle: boolean;
  clients: ClientDTO[];
  clientsSubscription: Subscription;
  currentClient: ClientDTO;

  constructor(private clientsService: ClientService, private  router: Router) { }

  ngOnInit() {
    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: ClientDTO[]) => {
        this.isSingle = false;
        this.clients = clients;
      }
    );
    this.clientsService.emitClients();
  }

  onNewClient() {
    this.router.navigate(['/client']);
  }

  onDeleteClient(client: ClientDTO) {
    this.clientsService.removeBook(client);
  }

  onViewClient(index: number, client: ClientDTO) {
    this.index = index;
    this.isSingle = true;
    this.currentClient = this.clients[index];
  }

  onBackDashboard() {
    this.isSingle = false;
  }
  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }

}
