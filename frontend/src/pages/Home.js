import React from "react";

function Home() {
  return (
    <div className="page">
      <h1>Welcome to DevSourceCodeJam</h1>
      <div className="dashboard">
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          {/* activity feed area */}
        </div>
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          {/* quick action buttons can be added */}
        </div>
      </div>
    </div>
  );
}

export default Home;
