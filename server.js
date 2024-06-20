const express = require("express");
const supabase = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

// Inisiasi Database
const database = supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const app = express();

app.use(cors());
app.use(express.json());

app.route("/").get(async (req, res) => {
  const getBlog = await database.from("blog").select();
  res.json({ getBlog });
});

app.route("/").post(async (req, res) => {
  const { title, description } = req.body;
  const insertBlog = await database.from("blog").insert({ title, description });
  res.json({ insertBlog });
});

const server = app.listen(3000, () => {
  console.log("Server sedang berjalan di port 3000");
});
