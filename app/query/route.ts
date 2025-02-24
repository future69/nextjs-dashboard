// import postgres from 'postgres';

const connectionPool = require("../utils/postgresDb");

async function listInvoices() {
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
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
