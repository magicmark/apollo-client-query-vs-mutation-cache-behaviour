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

const styles = {
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
