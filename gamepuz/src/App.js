import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Redirect to the load.html file in the public/webtechproj folder
    window.location.href = `${process.env.PUBLIC_URL}/mainfiles/index.html`;
  }, []);

  return (
    <div className="App">
      {/* You can include a loading message or animation here if you want */}
    </div>
  );
}

export default App;
