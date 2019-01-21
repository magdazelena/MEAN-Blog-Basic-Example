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
  blogPosts;
  categories;
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
      excerpt: "",
      category: new FormControl("")
    });
    this.getAllCats();
  }
  onBlogSubmit() {
    this.processing = true;
    const blog = {
      title: this.form.get("title").value,
      blog: this.form.get("blog").value,
      category: this.form.get("category").value,
      excerpt: this.form.get("excerpt").value,
      slug: this.form.get("title").value.replace("\\s", "")
    };
    this.blogService.newBlog(blog).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.form.reset(); // Reset all form fields
        }, 2000);
      }
    });
  }
  goBack() {
    window.location.reload();
  }
  reloadBlogs() {
    this.newPost = true;
    this.getAllBlogs();
    setTimeout(() => {
      this.loadingBlogs = false;
    }, 4000);
  }
  newBlogForm() {
    this.newPost = true;
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    });
  }
  getAllCats() {
    this.blogService.getAllCats().subscribe(data => {
      this.categories = data.cats;
    });
  }
  ngOnInit() {
    this.getAllBlogs();
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.name;
    });
  }
}
