import { Component, inject, OnInit } from "@angular/core";
import { NgClass, NgIf, UpperCasePipe } from "@angular/common";
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user.model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  imports: [
    NgIf,
    ReactiveFormsModule,
    UpperCasePipe,
    NgClass,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  styleUrls: ["./auth.component.sass"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  router = inject(Router);
  responseResult: string = "";
  errorResult: string = "";
  user: User = {
    username: "",
    password: "",
  };
  authForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.route.params.subscribe((params) => {
      const action = params["action"];
      this.isLoginMode = action === "login";
    });
  }
  onSubmit() {
    this.user.username = this.authForm.value.login;
    this.user.password = this.authForm.value.password;
    if (this.isLoginMode) {
      //login post
      this.authService.login(this.user).subscribe(
        (response) => {
          if (response.token) {
            this.responseResult = "logged succesfully. you will be redirected!";
            // console.log(response.token)
            // this.authService.setToken(response.token)
            // this.authService.getUserData(response.token).subscribe((response)=>{
            //   this.authService.setUserData(response)
            // },(error)=>{
            //   console.error(error)
            // })
            // console.log(response.token)

            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 1000);
          }
        },
        (error) => {
          this.errorResult = error.error.error;
        },
      );
    } else {
      //register post
      this.authService.register(this.user).subscribe(
        (response) => {
          this.responseResult =
            "registered successfully. you have to log in now!";
          setTimeout(() => {
            this.router.navigate(["/auth/login"]);
          }, 1000);
        },
        (error) => {
          this.errorResult = error.error.error;
        },
      );
    }
    this.authForm.reset();
    this.responseResult = "";
  }
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }
  clearResponse() {
    this.errorResult = this.responseResult = "";
  }
}
