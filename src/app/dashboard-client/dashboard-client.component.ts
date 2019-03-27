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
  clients: ClientDTO[];
  clientsSubscription: Subscription;

  constructor(private clientsService: ClientService, private  router: Router) { }

  ngOnInit() {
    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: ClientDTO[]) => {
        this.clients = clients;
        console.log(clients);
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

  onViewClient(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }

}
