import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { EcommerceService } from '../../services/ecommerce.service';

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
    private http: HttpClient,
    private ecommerceService: EcommerceService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const formValue = this.registerForm.value;
    if (this.registerForm.invalid) {
      alert('Formulario inválido');
      return;
    }
    if (formValue.password !== formValue.passwordConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const newUser: User = {
      nombre_usuario: formValue.name,
      apellido_usuario: formValue.lastName,
      correo_usuario: formValue.email,
      telefono_usuario: formValue.phone,
      direccion_usuario: formValue.address,
      password_usuario: formValue.password,
      rol_usuario: 'client',
    };

    this.ecommerceService.register(newUser).subscribe((data) => {
      console.log(data);
      alert('Usuario registrado exitosamente');
      this.router.navigate(['login']);
    });
  }
}
