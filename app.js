const { MongoClient } = require("mongodb");
require('dotenv').config();
// URI directa (¡no publicar en GitHub!)
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB Atlas");

    const db = client.db("ecommerce");
    const users = db.collection("users");

    // Insertar un usuario de ejemplo
    await users.insertOne({
      name: "Ejemplo",
      email: "ejemplo@mail.com",
      password: "123456",
      createdAt: new Date()
    });

    // Mostrar todos los usuarios
    const allUsers = await users.find().toArray();
    console.log("Usuarios:", allUsers);

  } catch (err) {
    console.error("❌ Error al conectar:", err);
  } finally {
    await client.close();
  }
}

main();
