const Notification = ({ message }) => {
  const successStyle = {
    color: "white",
    fontStyle: "italic",
    fontSize: 16,
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    border: "2px solid green",
  };

  const failStyle = {
    color: "red",
    fontStyle: "italic",
    fontSize: 16,
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    border: "2px solid red",
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={message[0] === true ? successStyle : failStyle}>
      {message[1]}
    </div>
  );
};

export default Notification;
