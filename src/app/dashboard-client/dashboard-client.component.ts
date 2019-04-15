import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {Subscription} from 'rxjs';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  isCreated = false;
  isModify = false;
  clientNull: ClientDTO;

  constructor(private formBuilder: FormBuilder, private clientsService: ClientService, private  router: Router) {
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

  search(key: string) {
    this.backUpClients = [];
    if (key === '') {
      this.backUpClients = this.clients;
    } else {
      this.clients.forEach(function(value) {
        console.log(key);
        console.log(value.entreprise);
        if (value.entreprise.includes(key)) {
          this.backUpClients.push(value);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }
  onSubmit() {
    this.search(this.signupForm.get('search').value);
  }

}
