import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("<Blog />", () => {
  const blog = {
    id: "5a422a851b54a676234d17f2",
    title: "JavaScript Closures",
    author: "Don Nadie",
    url: "https://example.com/js-patata",
    likes: 50,
    user: "66f693ebbdef5e18b505ef79",
  };

  const users = userEvent.setup();
  const mockHandler = vi.fn();

  let component;
  beforeEach(() => {
    component = render(<Blog blog={blog} handleUpdate={mockHandler} />);
  });

  test("renders content", () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });

  test("when click in the button view, the url is visible", async () => {
    const button = screen.getByText("View");
    await users.click(button);
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test("when click two times in the like button, the event is called two times", async () => {
    await users.click(screen.getByText("View"));
    const button = screen.getByText("Like");
    await users.click(button);
    await users.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
