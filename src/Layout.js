import React from "react";

const Layout = ({ children }) => (
  <div>
    {/* Header */}
    <header className="bg-dark text-white text-center py-3">
      <h1>Accounts Software</h1>
    </header>

    {/* Navigation Bar */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/ChartoFAccount">
                Chart of Accounts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/MasterAC">
                Master Account
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/GeneralJournal">
                General Journal
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Main Content */}
    <main className="container mt-4">{children}</main>

    {/* Footer */}
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <p>&copy; 2023 Haris Iqbal</p>
    </footer>
  </div>
);

export default Layout;
