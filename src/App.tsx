import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import QueryPage from "./QueryPage";
import MutationPage from "./MutationPage";
import QueryNestedPage from "./QueryNestedPage";
import MutationNestedPage from "./MutationNestedPage";
import MutationPersistedPage from "./MutationPersistedPage";
import MutationNestedPersistedPage from "./MutationNestedPersistedPage";
import QueryPersistedPage from "./QueryPersistedPage";
import QueryNestedPersistedPage from "./QueryNestedPersistedPage";

const queryLinks = [
  { to: "/query", label: "Query" },
  { to: "/query-persisted", label: "Query (Persisted)" },
  { to: "/query-nested", label: "Query (Nested)" },
  { to: "/nested-query-persisted", label: "Nested Query (Persisted)" },
];

const mutationLinks = [
  { to: "/mutation", label: "Mutation" },
  { to: "/mutation-persisted", label: "Mutation (Persisted)" },
  { to: "/mutation-nested", label: "Mutation (Nested)" },
  { to: "/nested-mutation-persisted", label: "Nested Mutation (Persisted)" },
];

const GITHUB_REPO_URL =
  "https://github.com/magicmark/apollo-client-query-vs-mutation-cache-behaviour";

const styles = {
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.25rem",
    borderBottom: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  headerTitle: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#1a202c",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  headerLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.8rem",
    color: "#4a5568",
    textDecoration: "none",
    fontWeight: 500,
    letterSpacing: "0.01em",
    transition: "color 0.2s",
  },
  nav: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 1rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  navRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "0.4rem 0.75rem",
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    opacity: 0.5,
    marginRight: "0.25rem",
  },
  link: {
    fontSize: "0.85rem",
    borderRadius: "6px",
    padding: "0.25rem 0.6rem",
    textDecoration: "none",
    transition: "background-color 0.2s",
  },
  activeLink: {
    fontWeight: 700,
  },
};

function App() {
  const location = useLocation();

  return (
    <div>
      <header style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Apollo Cache Playground</h1>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.headerLink}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          magicmark/apollo-client-query-vs-mutation-cache-behaviour
        </a>
      </header>
      <nav style={styles.nav}>
        <div style={styles.navRow}>
          <span style={styles.rowLabel}>Queries</span>
          {queryLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                ...styles.link,
                ...(location.pathname === to ? styles.activeLink : {}),
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div style={styles.navRow}>
          <span style={styles.rowLabel}>Mutations</span>
          {mutationLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                ...styles.link,
                ...(location.pathname === to ? styles.activeLink : {}),
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <Routes>
        <Route path="/query" element={<QueryPage />} />
        <Route path="/query-persisted" element={<QueryPersistedPage />} />
        <Route path="/mutation" element={<MutationPage />} />
        <Route path="/mutation-persisted" element={<MutationPersistedPage />} />
        <Route path="/query-nested" element={<QueryNestedPage />} />
        <Route path="/mutation-nested" element={<MutationNestedPage />} />
        <Route path="/nested-mutation-persisted" element={<MutationNestedPersistedPage />} />
        <Route path="/nested-query-persisted" element={<QueryNestedPersistedPage />} />
        <Route path="*" element={<Navigate to="/query" replace />} />
      </Routes>
    </div>
  );
}

export default App;
