import {Component, Input, OnInit} from '@angular/core';
import {ClientDTO} from '../DTOs/clientDTO';
import {ClientService} from '../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.css']
})
export class SingleClientComponent implements OnInit{
  private route: ActivatedRoute;

  @Input() currentClient: ClientDTO;

  constructor(private clientsService: ClientService, private  router: Router) {
  }

  ngOnInit() {
    // this.currentClient = this.route.snapshot.params[];
    console.log(this.route.snapshot.params);

    console.log(this.currentClient);
  }

}
