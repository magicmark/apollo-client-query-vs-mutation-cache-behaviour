/// <reference lib="webworker" />

import { graphql, buildSchema } from "graphql";

declare const self: ServiceWorkerGlobalScope;

// ---- Schema ----

const schema = buildSchema(`
  type DiceRollResult {
    value: Int!
  }

  type User {
    id: Int!
    diceRoll: DiceRollResult!
  }

  type Query {
    diceRoll: DiceRollResult!
    user(id: Int!): User!
  }

  type Mutation {
    diceRoll: DiceRollResult!
    updateUser(id: Int!, newPassword: String!): User!
  }
`);

// ---- Resolvers (root value) ----

function rollDice() {
  return { value: Math.floor(Math.random() * 6) + 1 };
}

const rootValue = {
  diceRoll: () => rollDice(),
  user: ({ id }: { id: number }) => ({
    id,
    diceRoll: () => rollDice(),
  }),
  updateUser: ({ id }: { id: number }) => ({
    id,
    diceRoll: () => rollDice(),
  }),
};

// ---- Service Worker lifecycle ----

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ---- Fetch handler ----

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/graphql" && event.request.method === "POST") {
    event.respondWith(handleGraphQL(event.request));
  }
});

async function handleGraphQL(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const result = await graphql({
      schema,
      source: body.query,
      variableValues: body.variables,
      rootValue,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ errors: [{ message: "Service Worker error: " + message }] }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
