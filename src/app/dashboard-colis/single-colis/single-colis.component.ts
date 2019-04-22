import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-single-colis',
  templateUrl: './single-colis.component.html',
  styleUrls: ['./single-colis.component.css']
})
export class SingleColisComponent implements OnInit {
  @Input() coli;
  enCours: string[][];
  total: number;
  @Output() back = new EventEmitter();
  constructor() { }

  ngOnInit() {
    const start = '2000-12-25';
    const end = 'N/A';
    this.monthCalcul(start, end);
  }
  monthCalcul(start: string, end: string) {
    this.total = 0;
    let depart;
    const arrivee = start.split('-');
    if (end === 'N/A') {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      depart = [yyyy, mm, dd];
    } else {
      depart = end.split('-');
    }
    const mois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const enCours = [[]];
    console.log(mois[+arrivee[1]]);
    console.log(+arrivee[2]);
    enCours.push([+arrivee[1] + '-' + arrivee[0], mois[+arrivee[1] - 1] - +arrivee[2]]);
    this.total +=  mois[+arrivee[1] - 1] - +arrivee[2];
    if (+arrivee[1] === 11) {
      arrivee[0] = +arrivee[0] + 1 + '' ;
      arrivee[1] = '0';
    } else {
      arrivee[1] = +arrivee[1] + 1 + '' ;
    }
    for (let i = +arrivee[0]; i <= +depart[0]; i++) {
      if (i % 4 === 0) {
        mois[1] = 29;
      }
      if (i === +depart[0]) {
        for (let j = 0; j < +depart[1] - 1; j++) {
          enCours.push([j + 1 + '-' + i, mois[j]]);
          this.total += mois[j];
        }
        enCours.push([+depart[1] + '-' + depart[0], +depart[2]]);
        this.total += +depart[2];
      } else {
        if (i === +arrivee[0]) {
          for (let j = +arrivee[1]; j < 1; j++) {
            enCours.push([j + 1 + '-' + i, mois[j]]);
            this.total += mois[j];
          }
        } else {
          for (let j = 0; j < 12; j++) {
            enCours.push([j + 1 + '-' + i, mois[j]]);
            this.total += mois[j];
          }
        }
      }
      mois[1] = 28;
    }
    this.enCours = enCours;
    console.log(this.enCours);
  }
  backEvent() {
    this.back.emit();
  }

}
