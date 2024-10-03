import { render, screen } from "@testing-library/react";
import AddBlog from "./AddBlog";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useState } from "react";

describe("<AddBlog />", () => {
  const createBlog = vi.fn();

  const TestComponent = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    return (
      <AddBlog
        createBlog={createBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
    );
  };

  let component;
  const user = userEvent.setup();

  beforeEach(() => {
    component = render(<TestComponent />);
  });

  it("should render AddBlog component", () => {
    expect(component).toBeTruthy();
  });

  test("verify that the form calls the event handler it received as props with the correct details when a new blog is created.", async () => {
    const title = "JavaScript Closures";
    const author = "Don Nadie";
    const url = "https://example.com/js-patata";

    const titleInput = screen.getByPlaceholderText("write title here");
    const authorInput = screen.getByPlaceholderText("write author here");
    const urlInput = screen.getByPlaceholderText("write url here");

    await user.type(titleInput, title);
    await user.type(authorInput, author);
    await user.type(urlInput, url);

    await user.click(screen.getByText("Create new blog"));

    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      title,
      author,
      url,
    });
  });
});
