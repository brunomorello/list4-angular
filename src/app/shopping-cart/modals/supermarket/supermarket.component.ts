import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Country } from 'src/app/shared/models/country';
import { Supermarket } from 'src/app/shared/models/supermarket';
import { SupermarketService } from '../../services/supermarket.service';

@Component({
  selector: 'app-supermarket',
  templateUrl: './supermarket.component.html',
  styleUrls: ['./supermarket.component.css']
})
export class SupermarketComponent implements OnInit {

  supermarket: Supermarket = {
    id: 0,
    name: null,
    country: null
  };

  countries = Object.entries(Country);

  constructor(private service: SupermarketService, 
    public dialogRef: MatDialogRef<SupermarketComponent>) { }

  ngOnInit(): void {
  }

  createSupermarket(): void {
    console.log(this.supermarket);

    this.service.createSupermarket(this.supermarket)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dialogRef.close();
        },
        error: (err) => console.error(err),
        complete: () => console.log('completed')
      });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
