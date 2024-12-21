import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
	selector: 'call-us',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		InputTextModule,
		InputTextareaModule,
		ButtonModule,
	],
	templateUrl: './call-us.component.html',
	styleUrl: './call-us.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallUsComponent {
	fb = inject(FormBuilder);

	contactUsForm = this.fb.group({
		name: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		branch: [''],
		message: ['', Validators.required],
	});

	isInvalidField(controlName: string): boolean {
		const control = this.contactUsForm.get(controlName);
		if (!control) return false;
		return control.invalid && control.touched;
	}
}
