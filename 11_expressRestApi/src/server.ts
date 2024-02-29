import express from "express";
const app = express();
const port = 3000;

const animals = [
  {
    name: "Lion",
    habitat: "Grasslands",
    sound: "Roar",
    emoji: "🦁",
  },
  {
    name: "Elephant",
    habitat: "Savanna",
    sound: "Trumpet",
    emoji: "🐘",
  },
  {
    name: "Dolphin",
    habitat: "Ocean",
    sound: "Clicks and Whistles",
    emoji: "🐬",
  },
];

app.use(express.json());

app.post("/api/animal", (req, res) => {
  animals.push(req.body);
  res.status(200).json({ animals: animals });
});

app.get("/api/animal/:name", (req, res) => {
  const animal = animals.find(
    (animal) => animal.name.toLowerCase() === req.params.name.toLowerCase()
  );
  animal ? res.status(200).json(animal) : res.status(200).json({});
});

app.get("/api/animals", (req, res) => {
  res.json({ animals: animals });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
