import { Component } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../assets/services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
})
export class LoginComponent {
	loginForm: FormGroup;
	errorMessage: string | null = null;
	isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			username: ["", Validators.required],
			password: ["", Validators.required],
		});
	}
	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}
		this.isLoading = true;
		const { username, password } = this.loginForm.value;

		this.authService.login(username, password).subscribe(
			(response) => {
				this.isLoading = false;
				if (response.error) {
					this.errorMessage = "Invalid username or password";
				} else {
					this.router.navigate(["/libraries"]);
				}
			},
			(error) => {
				this.isLoading = false;
				this.errorMessage = "Invalid username or password";
			}
		);
	}

	register() {
		// console.log("why not routing");
		this.router.navigate(["/register"]);
	}
}
