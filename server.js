const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
const userRouter = require('./routers/userRouter');
const animeRouter = require('./routers/animeRouter');
const mangaRouter = require('./routers/mangaRouter');
const filmeRouter = require('./routers/filmeRouter');
const animeListRouter = require('./routers/animeListRouter');
const filmeListRouter = require('./routers/filmeListRouter');
const mangaListRouter = require('./routers/mangaListRouter');

app.use(userRouter);
app.use(animeRouter);
app.use(mangaRouter);
app.use(filmeRouter);
app.use(animeListRouter);
app.use(filmeListRouter);
app.use(mangaListRouter);


app.get('/', (req, res) => {
    res.send('Welcome to AnimeList API');
});

app.listen(3000);