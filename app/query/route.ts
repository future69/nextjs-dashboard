import postgres from "postgres";

//Through API
//const connectionPool = require("../utils/postgresDb");

//Through RSC
const sql = postgres(process.env.POSTGRES_URL!);

//RSC Method
async function listInvoices() {
  const client = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
  return client;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

//API method
/* async function listInvoices() {
  try {
    const client = await connectionPool.connect(); // Get a client from the pool
    const query = `
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

    const result = await client.query(query); // Execute the query
    client.release(); // Release the client back to the pool

    return result.rows; // Return the fetched rows
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
} */
