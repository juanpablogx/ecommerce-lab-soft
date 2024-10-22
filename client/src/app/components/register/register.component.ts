import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    console.log('Formulario de registro:', this.registerForm.value);
    console.log('Formulario de registro válido:', this.registerForm.valid);
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      if (formData.password !== formData.passwordConfirm) {
        alert('Las contraseñas no coinciden');
        return;
      }
      this.http.post('http://localhost:8000/users', formData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          window.alert('Registro exitoso.');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el registro:', error);
          window.alert('Error en el registro.');
        }
      );
    } else {
      alert('Por favor, complete el formulario correctamente');
    }
  }
}
