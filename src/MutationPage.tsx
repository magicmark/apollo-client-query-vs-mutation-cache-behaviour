import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { CacheState } from "./CacheState";

const OPERATION_TEXT = `mutation DiceRollMutation {
  diceRoll {
    value
  }
}`;

const DICE_ROLL_MUTATION = gql`
  mutation DiceRollMutation {
    diceRoll {
      value
    }
  }
`;

const styles = {
  container: {
    textAlign: "center" as const,
    maxWidth: "640px",
    margin: "3rem auto",
    padding: "0 1.5rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    fontWeight: 600,
  },
  buttonGroup: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  button: {
    padding: "0.6em 1.4em",
    fontSize: "1rem",
    fontWeight: 500,
    borderRadius: "8px",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "border-color 0.25s, background-color 0.25s",
  },
  operationCard: {
    textAlign: "left" as const,
    background: "rgba(100, 108, 255, 0.06)",
    border: "1px solid rgba(100, 108, 255, 0.2)",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginBottom: "1.5rem",
  },
  operationLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    opacity: 0.7,
    marginBottom: "0.5rem",
  },
  operationCode: {
    margin: 0,
    fontSize: "0.85rem",
    lineHeight: 1.6,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace",
    whiteSpace: "pre" as const,
    overflowX: "auto" as const,
  },
  results: {
    marginTop: "1rem",
    marginBottom: "1.5rem",
  },
  cacheSection: {
    textAlign: "left" as const,
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginTop: "2rem",
  },
  cacheSectionLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    opacity: 0.7,
    marginBottom: "0.5rem",
  },
};

export default function MutationPage() {
  const client = useApolloClient();
  const [result, setResult] = useState<number | null>(null);
  const [rollDice, { loading }] = useMutation<{ diceRoll: { value: number } }>(DICE_ROLL_MUTATION, {
    onCompleted: (data) => {
      setResult(data.diceRoll.value);
    },
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dice Roller (Mutation)</h1>

      <div style={styles.operationCard}>
        <div style={styles.operationLabel}>Operation being sent:</div>
        <pre style={styles.operationCode}><code>{OPERATION_TEXT}</code></pre>
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => rollDice()} disabled={loading}>
          {loading ? "Rolling..." : "Roll Dice"}
        </button>
        <button style={styles.button} onClick={() => client.clearStore()}>
          Clear Cache
        </button>
      </div>

      {result !== null && (
        <div style={styles.results}>
          <p style={{ fontSize: "1.75rem", margin: "0.25rem 0" }}>
            You rolled: <strong>{result}</strong>
          </p>
        </div>
      )}

      <div style={styles.cacheSection}>
        <div style={styles.cacheSectionLabel}>Cache state:</div>
        <CacheState />
      </div>
    </div>
  );
}
