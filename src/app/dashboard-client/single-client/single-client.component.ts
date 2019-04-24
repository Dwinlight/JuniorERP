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
  count = 0;

  constructor(private clientsService: ClientService, private  router: Router, activatedRoute: ActivatedRoute) {
  }
//  constructor(private clientsService: ClientService, private  router: Router) {
//  }

  ngOnInit() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    for (const e of this.colis) {
      console.log('ng');
      console.log(e);
      console.log(this.client.id);
      if (+e.idEntreprise === +this.client.id) {
        this.own.push(e);
        const g = e.arrivee.split('-');
        const arr = new Date(e.arrivee);
        // const arr = new Date(g[0], g[1], g[2]);
        console.log('arr ' + e.arrivee);
        console.log(g);
        console.log(arr);
        console.log(today);
        if (today > arr) {
          if (e.depart !== 'N/A') {
            const j = e.depart.split('-');
            const departDate = new Date(+j[0], +j[1] , +j[2]);
            if (departDate > today) {
              this.count++;
              console.log('present1');
            }
          } else {
              this.count++;
              console.log('present2');
          }
        }
      }
    }


  }
  back() {
    this.backEvent.emit();
  }
  modify() {
    console.log('ici');
    this.modifyEvent.emit();
  }
  remove() {
    if (confirm('Voulez-vous vraiment supprimer ce client et tous les colis lui étant liés ?')) {
      this.removeEvent.emit();
    }
  }
}
