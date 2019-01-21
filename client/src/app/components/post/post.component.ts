import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { PublicService } from "../../services/public.service";
@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit, OnDestroy {
  slug;
  sub;
  postObject = "";
  message;
  messageClass;
  domain = "http://localhost:8080/";
  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService
  ) {}
  getFullPost() {
    if (!this.slug || this.slug == "undefined") {
      this.messageClass = "alert alert-danger";
      this.message = "Ups, no post found here";
      this.postObject = null;
    } else {
      (this.message = "there is message"), (this.messageClass = "");
      this.publicService.getPost(this.slug).subscribe(data => {
        this.postObject = data.blogs;
      });
    }
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.slug = params["slug"]; // (+) converts string 'id' to a number
      this.getFullPost();
      // In a real app: dispatch action to load the details here.
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
