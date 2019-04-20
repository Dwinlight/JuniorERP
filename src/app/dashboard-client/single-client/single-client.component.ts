import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientDTO} from '../../DTOs/clientDTO';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ColiDTO} from '../../DTOs/coliDTO';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.css']
})
export class SingleClientComponent implements OnInit{
  private route: ActivatedRouteSnapshot;
  clients: ClientDTO[];
  clientsSubscription: Subscription;
  @Input() client: ClientDTO;
  @Output() backEvent = new EventEmitter();
  @Output() modifyEvent = new EventEmitter();
  @Output() removeEvent = new EventEmitter();
  @Input() colis: ColiDTO[];
  own: ColiDTO[] = [];


  constructor(private clientsService: ClientService, private  router: Router, activatedRoute: ActivatedRoute) {
  }
//  constructor(private clientsService: ClientService, private  router: Router) {
//  }

  ngOnInit() {
    for (const e of this.colis) {
      console.log('ng');
      console.log(e);
      console.log(this.client.id);
      if (+e.idEntreprise === +this.client.id) {
        this.own.push(e);
      }
    }
    console.log('iniiiiit');
    console.log(this.own);

  }
  back() {
    this.backEvent.emit();
  }
  modify() {
    console.log('ici');
    this.modifyEvent.emit();
  }
  remove(){
    if (confirm('Voulez-vous vraiment supprimer ce client et tous les colis lui étant liés ?')) {
      this.removeEvent.emit();
    }
  }
}
