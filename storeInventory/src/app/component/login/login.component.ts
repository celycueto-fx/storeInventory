import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
   constructor(private authService: AngularFireAuth,private router:Router){}

   ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      pass: new FormControl('', Validators.required)
    });


  }

   login(){
    if (this.form.value != null) {
      this.authService.signInWithEmailAndPassword(this.form.value.email, this.form.value.pass).then(() => {
        this.router.navigate(['/home']);

      });

    }
   }
}
