const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config();

const { connect, getDb } = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connect().then(() => console.log("✅ Conectado a MongoDB"));

function buildUser({ name, email, bio }) {
  return {
    name,
    email,
    bio,
    createdAt: new Date()
  };
}

function buildPost({ userId, content }) {
  return {
    userId,
    content,
    createdAt: new Date()
  };
}

function buildComment({ postId, userId, text }) {
  return {
    postId,
    userId,
    text,
    createdAt: new Date()
  };
}

function buildFollow({ followerId, followingId }) {
  return {
    followerId,
    followingId,
    createdAt: new Date()
  };
}
 // Usuarios
  app.post('/users', async (req, res) => {
    const user = buildUser(req.body);
    const result = await getDb().collection('users').insertOne(user);
    res.status(201).json(result);
  });
  
  app.get('/users', async (req, res) => {
    const users = await getDb().collection('users').find().toArray();
    res.json(users);
  });
  
  // Publicaciones
  app.post('/posts', async (req, res) => {
    const post = buildPost(req.body);
    const result = await getDb().collection('posts').insertOne(post);
    res.status(201).json(result);
  });
  
  app.get('/posts', async (req, res) => {
    const posts = await getDb().collection('posts').find().toArray();
    res.json(posts);
  });
  
  // Comentarios
    app.post('/comments', async (req, res) => {
      const comment = buildComment(req.body);
      const result = await getDb().collection('comments').insertOne(comment);
      res.status(201).json(result);
    });
    
    app.get('/comments', async (req, res) => {
      const comments = await getDb().collection('comments').find().toArray();
      res.json(comments);
    });
  
  // Seguidores
  app.post('/follows', async (req, res) => {
    const follow = buildFollow(req.body);
    const result = await getDb().collection('follows').insertOne(follow);
    res.status(201).json(result);
  });
  
  app.get('/follows', async (req, res) => {
    const follows = await getDb().collection('follows').find().toArray();
    res.json(follows);
  });
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  });
  app.delete('/users/:id', async (req, res) => {
  const result = await getDb().collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

app.delete('/posts/:id', async (req, res) => {
  const result = await getDb().collection('posts').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

app.delete('/comments/:id', async (req, res) => {
  const result = await getDb().collection('comments').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

app.delete('/follows/:id', async (req, res) => {
  const result = await getDb().collection('follows').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

