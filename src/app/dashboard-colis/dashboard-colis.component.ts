import { Component, OnInit } from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subscription} from 'rxjs';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';
import {ColiDTO} from '../DTOs/coliDTO';
import {ColisService} from '../services/colis.service';

@Component({
  selector: 'app-dashboard-colis',
  templateUrl: './dashboard-colis.component.html',
  styleUrls: ['./dashboard-colis.component.css']
})
export class DashboardColisComponent implements OnInit {

  index: number = null;
  clients: ClientDTO[];
  colis: ColiDTO[];
  colisSubscription: Subscription;
  isCreated = false;
  isModify = false;
  coliNull: ColiDTO;
  entreprises: string[][];

  constructor(private colisService: ColisService, private clientsService: ClientService, private  router: Router) {
    this.coliNull = new ColiDTO();
    this.coliNull.numeroPalette = '';
    this.coliNull.marquage = '';
    this.coliNull.emplacement = '';
    this.coliNull.designation = '';
    this.coliNull.codeArticle = '';
    this.coliNull.depart = '';
    this.coliNull.arrivee = '';
    this.coliNull.remarque = '';
  }

  ngOnInit() {
    console.log('1');
    this.clientsService.emitClients();
    console.log('2');
    this.colisSubscription = this.colisService.colisSubject.subscribe(
      (colis: ColiDTO[]) => {
        this.colis = colis;
      }
    );
    this.colisService.emitColis();
  }

  onNewColis() {
    this.isCreated = true;
    // this.router.navigate(['/client']);
  }


  onViewColis(index: number) {
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
    this.colisSubscription.unsubscribe();
  }
}
