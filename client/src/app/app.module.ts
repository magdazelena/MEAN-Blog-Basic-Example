import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegisterComponent } from "./components/register/register.component";
import { PublicService } from "./services/public.service";
import { AuthService } from "./services/auth.service";
import { BlogService } from "./services/blog.service";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notAuth.guard";
import { BlogComponent } from "./components/blog/blog.component";
import { PostComponent } from "./components/post/post.component";
import { EditBlogComponent } from "./components/blog/edit-blog/edit-blog.component";
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,

    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    PostComponent,
    EditBlogComponent,
    DeleteBlogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PublicService, AuthService, AuthGuard, NotAuthGuard, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
