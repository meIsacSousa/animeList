const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
const userRouter = require('./routes/userRoute');
const animeRouter = require('./routes/animeRoute');
const mangaRouter = require('./routes/mangaRoute');
const filmeRouter = require('./routes/filmeRoute');
const animeListRouter = require('./routes/animeListRoute');
const filmeListRouter = require('./routes/filmeListRoute');
const mangaListRouter = require('./routes/mangaListRoute');

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