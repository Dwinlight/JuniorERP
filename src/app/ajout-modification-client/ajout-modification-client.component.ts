import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientDTO} from '../DTOs/clientDTO';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-ajout-modification-client',
  templateUrl: './ajout-modification-client.component.html',
  styleUrls: ['./ajout-modification-client.component.css']
})
export class AjoutModificationClientComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  @Output() backEvent = new EventEmitter();
  @Input() client;
  @Input() isModify;


  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      entreprise: [this.client.entreprise],
      interlocuteur: [this.client.interlocuteur],
      mail: [this.client.mail],
      telephone: [this.client.telephone],
      adresse: [this.client.adresse],
      remarque: [this.client.remarque]
    });
  }

  onSubmit() {
    const mail = this.signupForm.get('mail').value;
    const entreprise = this.signupForm.get('entreprise').value;
    const interlocuteur = this.signupForm.get('interlocuteur').value;
    const telephone = this.signupForm.get('telephone').value;
    const adresse = this.signupForm.get('adresse').value;
    const remarque = this.signupForm.get('remarque').value;
    const clientDTO = new ClientDTO();
    clientDTO.mail = mail;
    clientDTO.entreprise = entreprise;
    clientDTO.interlocuteur = interlocuteur;
    clientDTO.telephone = telephone;
    clientDTO.adresse = adresse;
    clientDTO.remarque = remarque;
    this.isModify ? this.clientService.modifyClients(this.client, clientDTO) : this.clientService.createNewClient(clientDTO);
    this.router.navigate(['/clients']);
    this.back();
  }

  back() {
    this.backEvent.emit();
  }
}
