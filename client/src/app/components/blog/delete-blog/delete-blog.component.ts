import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../../../services/blog.service";
@Component({
  selector: "app-delete-blog",
  templateUrl: "./delete-blog.component.html",
  styleUrls: ["./delete-blog.component.scss"]
})
export class DeleteBlogComponent implements OnInit {
  id;
  message;
  messageClass;
  constructor(
    private location: Location,
    private activedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}
  goBack() {
    this.location.back();
  }
  deleteBlog(id) {
    this.blogService.deletePost(id).subscribe(data => {
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
  ngOnInit() {
    this.id = this.activedRoute.snapshot.params.id;
  }
}
