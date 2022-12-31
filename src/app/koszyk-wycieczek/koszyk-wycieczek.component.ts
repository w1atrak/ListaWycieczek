import { Component, Input, OnInit} from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.component';
@Component({
  selector: 'app-koszyk-wycieczek',
  templateUrl: './koszyk-wycieczek.component.html',
  styleUrls: ['./koszyk-wycieczek.component.css']
})
export class KoszykWycieczekComponent implements OnInit {

  constructor() { }

  @Input() wycieczki: Wycieczka[] = [];
  sumaWycieczek: number = 0;
  sumaKosztu: number = 0;

  ngOnInit(): void {
    console.log(this.wycieczki, "z koszykaa")
    console.log()
  }

  handleChanges() {

    this.sumaKosztu = 0;
    this.sumaWycieczek = 0;
    this.wycieczki.forEach((wycieczka: Wycieczka) => {
      this.sumaWycieczek += wycieczka.reserved;
      this.sumaKosztu += wycieczka.reserved * wycieczka.price;
    })
  }

}
