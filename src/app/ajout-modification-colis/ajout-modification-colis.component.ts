import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ColiDTO} from '../DTOs/coliDTO';
import {ColisService} from '../services/colis.service';
import {ClientDTO} from '../DTOs/clientDTO';
import {ClientService} from '../services/client.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ajout-modification-colis',
  templateUrl: './ajout-modification-colis.component.html',
  styleUrls: ['./ajout-modification-colis.component.css']
})
export class AjoutModificationColisComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  @Output() backEvent = new EventEmitter();
  clients: ClientDTO[];
  clientsSubscription: Subscription;
  @Input() colis;
  @Input() isModify;
  entreprises: string[][];



  constructor(private clientsService: ClientService, private formBuilder: FormBuilder, private colisService: ColisService,
              private router: Router) {

  }

  ngOnInit() {
    this.entreprises = [[]];
    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: ClientDTO[]) => {
        this.clients = clients;
        for (const value of this.clients) {
          console.log('ici');
          this.entreprises.push(['' + value.id, value.entreprise]);
        }
      }
    );
    this.clientsService.emitClients();
    this.initForm();
  }

  initForm() {
    console.log(this.entreprises[1][1]);
    console.log(this.colis.entreprise);
    this.signupForm = this.formBuilder.group({
      entreprise: [this.colis.entreprise],
      arrivee: [this.colis.arrivee],
      depart: [this.colis.depart],
      codeArticle: [this.colis.codeArticle],
      designation: [this.colis.designation],
      emplacement: [this.colis.emplacement],
      remarque: [this.colis.remarque],
      marquage: [this.colis.remarque],
      numeroPalette: [this.colis.remarque]
    });
  }

  onSubmit() {
    let idEntreprise;
    const entreprise = this.signupForm.get('entreprise').value;
    for (const e of this.entreprises) {
      if (e[1] === this.signupForm.get('entreprise').value) {
        idEntreprise = e[0];
      }
    }
    const arrivee = this.signupForm.get('arrivee').value;
    const depart = this.signupForm.get('depart').value;
    const codeArticle = this.signupForm.get('codeArticle').value;
    const remarque = this.signupForm.get('remarque').value;
    const designation = this.signupForm.get('designation').value;
    const emplacement = this.signupForm.get('emplacement').value;
    const marquage = this.signupForm.get('marquage').value;
    const numeroPalette = this.signupForm.get('numeroPalette').value;
    const coliDTO = new ColiDTO();
    coliDTO.entreprise = entreprise;
    coliDTO.idEntreprise = idEntreprise;
    coliDTO.arrivee = arrivee;
    coliDTO.depart = depart === '' ? 'N/A' : depart;
    coliDTO.codeArticle = codeArticle;
    coliDTO.remarque = remarque;
    coliDTO.designation = designation;
    coliDTO.emplacement = emplacement;
    coliDTO.marquage = marquage;
    coliDTO.numeroPalette = numeroPalette;
    console.log(entreprise);
    console.log(idEntreprise);
    this.isModify ? this.colisService.modifyColi(this.colis, coliDTO) : this.colisService.createNewColi(coliDTO);
    this.router.navigate(['/colis']);
    this.back();
  }

  back() {
    this.backEvent.emit();
  }
  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }
}
