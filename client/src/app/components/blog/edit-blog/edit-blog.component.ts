import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../../../services/blog.service";
@Component({
  selector: "app-edit-blog",
  templateUrl: "./edit-blog.component.html",
  styleUrls: ["./edit-blog.component.scss"]
})
export class EditBlogComponent implements OnInit {
  blog = {
    title: String,
    blog: String,
    excerpt: String,
    category: String
  };
  message = "";
  messageClass = "";
  currentUrl;
  categories;
  constructor(
    private location: Location,
    private activedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  updateBlogSubmit() {
    this.blogService.editPost(this.blog).subscribe(data => {
      if (data.success) {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(["/blog"]);
        }, 2000);
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
      }
    });
  }
  goBack() {
    this.location.back();
  }
  getAllCats() {
    this.blogService.getAllCats().subscribe(data => {
      this.categories = data.cats;
    });
  }
  ngOnInit() {
    this.getAllCats();
    this.currentUrl = this.activedRoute.snapshot.params;
    this.blogService.getPost(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
      } else {
        this.blog = data.blogs;
      }
    });
  }
}
