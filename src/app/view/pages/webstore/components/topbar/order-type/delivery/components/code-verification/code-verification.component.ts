import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
	selector: 'app-code-verification',
	standalone: true,
	imports: [CommonModule, FormsModule], // Add FormsModule here
	templateUrl: './code-verification.component.html',
	styleUrls: ['./code-verification.component.scss'],
})
export class CodeVerificationComponent {
	isModalVisible = true;

	// OTP logic
	otpControls = Array(4).fill(''); // Array to hold input controls
	otpValues: string[] = ['', '', '', '']; // Array to hold each input's value
	inputCount = 0; // Counter for filled inputs
	finalInput = '';

	closeModal() {
		this.isModalVisible = false;
	}

	openModal() {
		this.isModalVisible = true;
	}

	// Update input focus and disabled status
	updateInputConfig(index: number, disabledStatus: boolean): void {
		const input =
			document.querySelectorAll<HTMLInputElement>('.input')[index];
		if (input) {
			input.disabled = disabledStatus;
			disabledStatus ? input.blur() : input.focus();
		}
	}

	onKeyUp(event: KeyboardEvent, index: number): void {
		const target = event.target as HTMLInputElement;
		target.value = target.value.replace(/[^0-9]/g, ''); // Allow only numeric input

		if (target.value.length === 1) {
			this.otpValues[index] = target.value;
			this.finalInput += target.value;
			this.inputCount = this.otpValues.filter((v) => v).length;

			if (index < this.otpControls.length - 1) {
				this.updateInputConfig(index, true);
				this.updateInputConfig(index + 1, false);
			}
		} else if (event.key === 'Backspace' && target.value.length === 0) {
			this.finalInput = this.finalInput.slice(0, -1);
			this.inputCount = this.otpValues.filter((v) => v).length;

			if (index > 0) {
				this.updateInputConfig(index, true);
				this.updateInputConfig(index - 1, false);
				this.otpValues[index - 1] = '';
			}
		}
	}

	validateOTP(): void {
		alert('Success: ' + this.finalInput);
	}
}
