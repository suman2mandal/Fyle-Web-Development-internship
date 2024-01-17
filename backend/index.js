import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
const port = 5000;

app.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const itemsPerPage = 10; // Set the desired number of projects per page
        const page = req.query.page || 1;
        const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${itemsPerPage}`;

        const response = await axios.get(url);
        const repos = response.data.map(repo => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            url: repo.html_url
        }));

        res.json(repos);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from GitHub.');
    }
});


app.get('/user/:username/profile', async (req, res) => {
    try {
        const username = req.params.username;
        const url = `https://api.github.com/users/${username}`;

        const response = await axios.get(url);
        const profile = {
            name: response.data.name,
            bio: response.data.bio,
            location: response.data.location,
            twitter_username: response.data.twitter_username,
            html_url: response.data.html_url,
            avatar_url: response.data.avatar_url
        };

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from GitHub.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
