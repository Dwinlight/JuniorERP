import { Component, OnInit } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      entreprise: [''],
      interlocuteur: [''],
      mail: ['', [Validators.email]],
      telephone: [''],
      adresse: [''],
      remarque: ['']
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
    this.clientService.createNewClient(clientDTO);
    this.router.navigate(['']);
  }
}
