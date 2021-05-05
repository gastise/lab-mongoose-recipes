const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");

// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      const newRecipe = await Recipe.create({
        title: "Taco",
        level: "Easy Peasy",
        ingredients: ["chicken", " vegetables", "fajitas"],
        cuisine: "mexican",
        dishType: "main_course",
        duration: 20,
        creator: "Gaston",
      });
      console.log(newRecipe.title);
      const dataRecipe = await Recipe.insertMany(data);
      dataRecipe.forEach(Recipe => {
        console.log(Recipe.title);
      });
      await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      );
      console.log("Successfully updated Rigatoni");
      const removedCarrotCake = await Recipe.deleteOne({
        title: "Carrot Cake",
      });
      console.log("Successfully removed Carrot Cake");
      mongoose.connection.close(()=>console.log("connection closed"))
    } catch (err) {
      console.error(err);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
