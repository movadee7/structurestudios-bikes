import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';
import { Bike } from '../../bike.model';
import { BikeService } from './bike.service';

@Component({
  selector: 'ss-bike',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bike.component.html',
})
export class BikeComponent {
  constructor(private router: Router, public bikeService: BikeService, public apiService: ApiService) {}

  saveBike() {
    // TODO: this code needs to be refactored so that form changes auto sync with full bike object
    this.bikeService.updateBike();
    this.apiService.saveBike(this.bikeService.bike).subscribe((bike: Bike) => {
      this.bikeService.setBike(bike);
    });
  }

  editBike() {
    this.bikeService.bikeForm.enable();
  }

  cancelEditBike() {
    this.bikeService.resetBikeForm();
    this.bikeService.bikeForm.disable();
  }

  deleteBike(): void {
    this.apiService.deleteBike(this.bikeService.bikeId()).subscribe((_) => {
      this.router.navigate(['']);
    });
  }
}
