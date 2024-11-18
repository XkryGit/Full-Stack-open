import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const userBlogs = blogs && blogs.filter((blog) => blog.user.username === id);

  return (
    <div>
      <h2>{id}</h2>
      <p>Added blogs</p>
      {userBlogs &&
        userBlogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
    </div>
  );
};

export default User;
