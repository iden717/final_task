const Alert = ({ error, message }) => {
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );

  if (!error)
    return (
      <div className="alert alert-success" role="alert">
        Success update data
      </div>
    );
};

export default Alert;
