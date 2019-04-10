import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientDTO} from '../DTOs/clientDTO';
import {ClientService} from '../services/client.service';
import {ColiDTO} from '../DTOs/coliDTO';

@Component({
  selector: 'app-ajout-modification-client',
  templateUrl: './ajout-modification-colis.component.html',
  styleUrls: ['./ajout-modification-colis.component.css']
})
export class AjoutModificationColisComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  @Output() backEvent = new EventEmitter();
  @Input() colis;
  @Input() isModify;
  @Input() entreprises;


  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      entreprise: [this.colis.entreprise],
      interlocuteur: [this.colis.interlocuteur],
      mail: [this.colis.mail],
      telephone: [this.colis.telephone],
      adresse: [this.colis.adresse],
      remarque: [this.colis.remarque]
    });
  }

  onSubmit() {
    const mail = this.signupForm.get('mail').value;
    const entreprise = this.signupForm.get('entreprise').value;
    const interlocuteur = this.signupForm.get('interlocuteur').value;
    const telephone = this.signupForm.get('telephone').value;
    const adresse = this.signupForm.get('adresse').value;
    const remarque = this.signupForm.get('remarque').value;
    const coliDTO = new ColiDTO();
    coliDTO.mail = mail;
    coliDTO.entreprise = entreprise;
    coliDTO.interlocuteur = interlocuteur;
    coliDTO.telephone = telephone;
    coliDTO.adresse = adresse;
    coliDTO.remarque = remarque;
    this.isModify ? this.clientService.modifyClients(this.colis, coliDTO) : this.clientService.createNewClient(coliDTO);
    this.router.navigate(['/clients']);
    this.back();
  }

  back() {
    this.backEvent.emit();
  }
}
