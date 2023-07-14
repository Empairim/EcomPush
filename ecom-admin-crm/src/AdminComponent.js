import React from 'react';

function AdminComponent() {
  const sayHello = () => {
    return 'Hello, world!';
  };

  return (
    <div>
      <h1>Welcome, admin!</h1>
      <p>{sayHello()}</p>
    </div>
  );
}

export default AdminComponent;