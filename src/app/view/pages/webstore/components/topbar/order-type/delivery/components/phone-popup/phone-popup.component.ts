import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
	selector: 'app-phone-popup',
	standalone: true,
	imports: [CommonModule], // Add CommonModule here
	templateUrl: './phone-popup.component.html',
	styleUrls: ['./phone-popup.component.scss'],
})
export class PhonePopupComponent {
	isModalVisible = true;

	closeModal() {
		this.isModalVisible = false;
	}

	openModal() {
		this.isModalVisible = true;
	}
}
