import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder , FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Countries, MyApisService } from 'src/app/services/my-apis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ICountries:Countries[];
  // countries: any[]; 
  ipAddress: string; 
  location: any;
  inputText: string = '';
  errorMessage=false;
  
  constructor( 
    public _MyApis:MyApisService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserIpAdress()
    
  }

  onKeyUp() {
    const arabicRegex = /[\u0600-\u06FF]/;
    if (arabicRegex.test(this.inputText)) {
      this.inputText='';
      this.errorMessage=true
    }
    else{
      this.errorMessage=false
    }
  }

  signupForm = this.fb.group({
    name: [ null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), this.disableArabicValidator]],
    nationality: [ null, [Validators.required]],
    email: [ null, [Validators.required, Validators.email]],
    password:new FormControl( null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}[^\u0600-\u06FF]$')]),
    confirmPassword: [ null, [Validators.required, this.matchPasswordValidator.bind(this)]],
    ip_address: [ null,[Validators.required]],
    // ip_address: [{value: '', disabled: true},[Validators.required]],

  });

  // signup Form getter
  get name() {return this.signupForm.get("name")}
  get nationality() {return this.signupForm.get("nationality")}
  get email() {return this.signupForm.get("email")}
  get password() {return this.signupForm.get("password")}
  get passwordConfirmation() {return this.signupForm.get("passwordConfirmation")}
  get confirmPassword() {return this.signupForm.get("confirmPassword")}
  get ip_address() {return this.signupForm.get("ipAddress")}

  matchPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.signupForm && this.signupForm.controls.password.value;
    return password && control.value !== password ? { passwordsNotMatch: true } : null;

  }
  
  disableArabicValidator(control: AbstractControl): ValidationErrors | null {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(control.value) ? { arabicDisabled: true } : null;
  }
  
  getUserIpAdress(){
    this._MyApis.getUserIpAdress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.signupForm.patchValue({ 
        ip_address: this.ipAddress ,
      
      });
      this.getCountries(); // call the getCountries() method
      this.getLocation(); // call the getLocation() method
    });
  }

  getCountries() {
    this._MyApis.GetAllCountries().subscribe((res: any[]) => {
      this.ICountries = res;
    });
  }
  
  getLocation() {
    this._MyApis.getGeoLocation(this.ipAddress).subscribe((res: any) => {
      this.location = res; 
      this.signupForm.patchValue({ 
        nationality: res.country_name ,
      
      });
    });
  }

  signup(){
    console.log(this.signupForm.value);
    
    if(this.signupForm.valid){
      localStorage.setItem('userName', this.signupForm.controls.name.value);
      localStorage.setItem('ip_address', this.signupForm.controls.ip_address.value);
      this.router.navigate(['/welcome']);

    }
    else{
      alert("in Valid")
    }

  }
}
