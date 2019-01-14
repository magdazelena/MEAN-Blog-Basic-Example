import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { BlogService } from "../../services/blog.service";
@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"]
})
export class BlogComponent implements OnInit {
  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  form;
  processing = false;
  username;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
  ) {
    this.createNewBlogForm();
  }

  createNewBlogForm() {
    this.form = this.formBuilder.group({
      title: "",
      blog: "",
      createdBy: ""
    });
  }
  onBlogSubmit() {
    console.log("form submitted");

    this.processing = true;
    const blog = {
      title: this.form.get("title").value,
      blog: this.form.get("blog").value,
      createdBy: this.username
    };

    this.blogService.newBlog(blog).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
      }
    });
  }
  goBack() {
    window.location.reload();
  }
  reloadBlogs() {
    this.newPost = true;
    //get blogs
    setTimeout(() => {
      this.loadingBlogs = false;
    }, 4000);
  }
  newBlogForm() {
    this.newPost = true;
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
    });
  }
}
