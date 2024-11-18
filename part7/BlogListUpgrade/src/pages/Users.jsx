import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const usersAcumulated =
    blogs &&
    blogs
      .map((blog) => blog.user.username)
      .reduce((acc, user) => {
        acc[user] = (acc[user] || 0) + 1;
        return acc;
      }, {});
  return (
    <div>
      <h2>Users</h2>
      {usersAcumulated && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>blogs</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(usersAcumulated).map((user) => (
              <tr key={user}>
                <td className="blocks">
                  <Link className="link" to={`/user/${user}`}>
                    {user}
                  </Link>
                </td>
                <td>{usersAcumulated[user]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
