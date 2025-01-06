# Json Placeholder Services

This folder contains a set of services that are used to fetch data from the [Json Placeholder API](https://jsonplaceholder.typicode.com/). The services are used by the components in the `src/app` folder to fetch data to display.

## Purpose

The purpose of these services is to provide a simple way for components to fetch data from the Json Placeholder API. This allows components to focus on displaying the data, rather than worrying about how to fetch it.

## How to use

To use a Json Placeholder service, you need to inject it into your component. For example, to use the `JsonPlaceholderUserService`, you would inject it like this:

```ts
import { JsonPlaceholderUserService } from "../core/json-placeholder/user/user.service";

@Component({
  selector: "app-example",
  template: "<p>Example Component</p>",
})
export class ExampleComponent {
  constructor(private userService: JsonPlaceholderUserService) {}
}
```

## Creating services for other entities

To create a service for another entity, you should create a new class that extends the `BaseJsonPlaceholderService` class. For example, to create a service for the `posts` entity, you would create a class like this:

```ts
import { BaseJsonPlaceholderService } from "./base-json-placeholder.service";

@Injectable({
  providedIn: "root",
})
export class JsonPlaceholderPostService extends BaseJsonPlaceholderService<JsonPlaceholderPost, JsonPlaceholderPostFilters> {
  constructor(override http: HttpClient) {
    super(http, "/posts");
  }
}
```

## Creating the types for the entity

To create the types for the entity, you should create a new interface for the entity itself and another interface for the filters. For example, to create the types for the `posts` entity, you would create interfaces like this:

```ts
export interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type JsonPlaceholderPostFilterKeys = keyof Omit<JsonPlaceholderPost, "id" | "address" | "company">;

export type JsonPlaceholderPostFilters = Partial<{
  [param in JsonPlaceholderPostFilterKeys]: string | number | boolean;
}>;
```

To ensure every searchable key in the main entity could be used in the filters and the filters object match the HttpParams interface, the `JsonPlaceholderPostFilterKeys` and `JsonPlaceholderPostFilters` type were created in this way.

## Example Usage

Once you have created your service, you can use it in your components to fetch data. For instance, if you have created a `JsonPlaceholderPostService`, you can use it like this:

```ts
import { JsonPlaceholderPostService } from "../core/json-placeholder/post/post.service";

@Component({
  selector: "app-posts",
  template: "<p>Posts Component</p>",
})
export class PostsComponent {
  posts: Post[] = [];

  constructor(private postService: JsonPlaceholderPostService) {}

  ngOnInit() {
    this.postService.getAll().subscribe((data) => {
      this.posts = data;
    });
  }
}
```

In this example, the `JsonPlaceholderPostService` is injected into the `PostsComponent`, and the `getAll()` method is called to fetch all posts from the API. The fetched data is then stored in the `posts` property of the component.
