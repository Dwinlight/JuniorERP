import {Component, Input, OnInit} from '@angular/core';
import {ClientDTO} from '../../DTOs/clientDTO';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.css']
})
export class SingleClientComponent implements OnInit {

  @Input() currentClient: ClientDTO;

  constructor() {
  }

  ngOnInit() {
  }

}
