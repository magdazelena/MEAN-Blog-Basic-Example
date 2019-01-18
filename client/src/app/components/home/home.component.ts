import { Component, OnInit } from "@angular/core";
import { PublicService } from "../../services/public.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  blogPosts;
  domain = "http://localhost:8080/";
  constructor(private publicService: PublicService) {}

  getAllBlogs() {
    this.publicService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    });
  }
  ngOnInit() {
    this.getAllBlogs();
  }
}
