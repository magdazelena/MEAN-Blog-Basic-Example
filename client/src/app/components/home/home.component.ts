import { Component, OnInit, NgModule } from "@angular/core";
import { PublicService } from "../../services/public.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  blogPosts;
  categories;
  message;
  messageClass;
  domain = "http://localhost:8080/";
  constructor(private publicService: PublicService) {}

  getAllBlogs() {
    this.publicService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    });
  }
  reloadPosts(scope) {
    if (scope === "all") {
      this.message = "";
      this.messageClass = "";
      this.getAllBlogs();
    } else {
      this.publicService.getBlogOfCat(scope).subscribe(data => {
        if (!data.success) {
          this.messageClass = "alert alert-danger";
          this.message = data.message;
          this.blogPosts = [];
        } else {
          this.message = "";
          this.messageClass = "";
          this.blogPosts = data.blogs;
        }
      });
    }
  }
  getAllCats() {
    this.publicService.getAllCats().subscribe(data => {
      this.categories = data.cats;
    });
  }
  ngOnInit() {
    this.getAllBlogs();
    this.getAllCats();
  }
}
