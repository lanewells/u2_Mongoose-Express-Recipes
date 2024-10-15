const db = require('../db')
const Capacity = require('../models/capacity')
const Recipe = require('../models/recipe')
const Directions = require('../models/directions')

db.on('error', console.error.bind(console, 'mongodb connection error:'))

const main = async () => {
    await Capacity.deleteMany()
    await Recipe.deleteMany()
    console.log('deleted capacities and recipes')
//Recipes with Directions as embedded subdoc
    const recipes = [
        {
            title: "5-Minute Avocado Toast",
            description: "A quick, simple, and healthy avocado toast to start your day right.",
            image: "https://example.com/avocado-toast.jpg",
            capacityLevel: "1/4 - Can't I have sleep for dinner?",
            servingSize: 1,
            ingredients: "1 ripe avocado, 2 slices of gluten-free bread, 1/2 tsp salt, 1/4 tsp black pepper, 1/2 tsp lemon juice",
            directions:  [
                {
                    necessaryEquipment: ["Toaster", "Knife"],
                    steps: "Toast your bread until golden and crispy. While the bread is toasting, slice open the avocado, remove the pit, and scoop the flesh into a bowl. Mash the avocado with a fork, adding a pinch of salt, pepper, and a squeeze of lemon juice. Spread the mashed avocado on the toast and enjoy immediately."
                }
            ],
            spice: 0,
            halal: true,
            kosher: true,
            glutenFree: true,
            vegan: true,
            vegetarian: true
        },
        {
            title: "Spaghetti Carbonara",
            description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
            image: "https://example.com/spaghetti-carbonara.jpg",
            capacityLevel: "2/4 - It's either this, or I DoorDash Taco Bell.",
            servingSize: 4,
            ingredients: "12 oz spaghetti, 4 oz pancetta, 2 large eggs, 1 cup grated Parmesan, 1 tsp black pepper, 2 tbsp olive oil",
            directions: [
                {
                    necessaryEquipment: ["Large pot", "Frying pan", "Whisk"],
                    steps: "Cook the spaghetti in salted boiling water until al dente. While the pasta cooks, crisp up the pancetta in a frying pan. In a bowl, whisk together the eggs, Parmesan, and a good amount of black pepper. Drain the pasta, reserving some pasta water. Toss the hot pasta with the pancetta and remove from the heat. Quickly stir in the egg mixture, adding a splash of pasta water to create a creamy sauce. Serve immediately."
                }
            ],
            spice: 1,
            halal: false,
            kosher: false,
            glutenFree: false,
            vegan: false,
            vegetarian: false
        },
        {
            title: "Vegetarian Stir-Fry",
            description: "A quick, colorful vegetable stir-fry with tofu.",
            image: "https://example.com/vegetarian-stir-fry.jpg",
            capacityLevel: "2/4 - It's either this, or I DoorDash Taco Bell.",
            servingSize: 2,
            ingredients: "1 block of tofu (14 oz), 2 bell peppers, 2 medium carrots, 3 tbsp soy sauce, 1 tsp minced ginger, 2 cloves garlic",
            directions: [
                {
                    necessaryEquipment: ["Wok or large skillet"],
                    steps: "Press the tofu to remove excess moisture, then cut it into cubes. Heat oil in a wok and fry the tofu until golden on all sides. Remove the tofu and set aside. In the same wok, stir-fry your sliced veggies (bell peppers, carrots) with garlic and ginger for a few minutes. Add the tofu back in, pour in the soy sauce, and cook everything together for another couple of minutes. Serve over rice or noodles."
                }
            ],
            spice: 2,
            halal: true,
            kosher: true,
            glutenFree: true,
            vegan: true,
            vegetarian: true
        },
        {
            title: "Chicken Tikka Masala",
            description: "Marinated chicken in a creamy tomato sauce, served with rice.",
            image: "https://example.com/chicken-tikka-masala.jpg",
            capacityLevel: "3/4 - I can handle a little chopping.",
            servingSize: 4,
            ingredients: "1 lb chicken breast, 1/2 cup plain yogurt, 2 tbsp garam masala, 1 tsp cumin, 1 can tomato sauce (15 oz), 1/2 cup heavy cream",
            directions: [
                {
                    necessaryEquipment: ["Large skillet", "Mixing bowls"],
                    steps: "In a bowl, marinate the chicken with yogurt, garam masala, and cumin. Let it sit for at least 30 minutes. Heat oil in a large skillet and cook the chicken until browned. Remove the chicken and set aside. In the same pan, cook the tomato sauce and spices. Stir in cream, return the chicken to the pan, and simmer for about 10 minutes until the sauce thickens. Serve with rice or naan."
                }
            ],
            spice: 3,
            halal: true,
            kosher: false,
            glutenFree: true,
            vegan: false,
            vegetarian: false
        },
        {
            title: "Vegan Buddha Bowl",
            description: "A nutritious and balanced meal with quinoa, roasted vegetables, and avocado.",
            image: "https://example.com/vegan-buddha-bowl.jpg",
            capacityLevel: "3/4 - I can handle a little chopping.",
            servingSize: 2,
            ingredients: "1 cup quinoa, 1 sweet potato, 1 avocado, 1/4 cup chickpeas, 2 tbsp tahini, 1/2 tsp lemon juice, 1/2 tsp paprika",
            directions: [
                {
                    necessaryEquipment: ["Baking sheet", "Small saucepan"],
                    steps: "Preheat your oven to 400°F. Dice the sweet potatoes, toss them in olive oil, salt, and paprika, and roast for 25-30 minutes until tender. Meanwhile, cook the quinoa in a small saucepan according to package instructions. Once everything is ready, assemble your bowl with quinoa, roasted sweet potatoes, chickpeas, and avocado slices. Drizzle with tahini dressing and enjoy!"
                }
            ],
            spice: 1,
            halal: true,
            kosher: true,
            glutenFree: true,
            vegan: true,
            vegetarian: true
        },
        {
            title: "Gluten-Free Pancakes",
            description: "Fluffy gluten-free pancakes, perfect for breakfast.",
            image: "https://example.com/gluten-free-pancakes.jpg",
            capacityLevel: "2/4 - It's either this, or I DoorDash Taco Bell.",
            servingSize: 4,
            ingredients: "1 1/2 cups gluten-free flour, 1 large egg, 1 cup milk, 2 tbsp butter, 1 tbsp sugar, 1 tsp vanilla extract",
            directions: [
                {
                    necessaryEquipment: ["Mixing bowl", "Griddle or skillet"],
                    steps: "In a mixing bowl, whisk together the gluten-free flour, egg, milk, melted butter, sugar, and vanilla. Heat a lightly oiled griddle over medium heat. Pour about 1/4 cup of batter onto the griddle for each pancake. Cook until bubbles form on the surface, then flip and cook until golden brown on the other side. Serve with syrup or your favorite toppings."
                }
            ],
            spice: 0,
            halal: true,
            kosher: true,
            glutenFree: true,
            vegan: false,
            vegetarian: true
        },
        {
            title: "Beef Wellington",
            description: "Beef tenderloin wrapped in puff pastry with mushroom duxelles.",
            image: "https://example.com/beef-wellington.jpg",
            capacityLevel: "4/4 - I am chef.",
            servingSize: 6,
            ingredients: "2 lb beef tenderloin, 1 sheet puff pastry, 1/2 lb mushrooms, 2 tbsp Dijon mustard, 4 slices prosciutto, 1 egg",
            directions: [
                {
                    necessaryEquipment: ["Oven", "Skillet", "Baking sheet"],
                    steps: "Preheat your oven to 400°F. Sear the beef tenderloin on all sides in a hot skillet, then brush it with Dijon mustard. Spread the mushroom duxelles over the prosciutto slices, wrap the beef in the prosciutto, then in puff pastry. Brush the pastry with an egg wash and bake for 30-40 minutes until golden brown and the beef is cooked to your desired doneness. Let it rest before slicing."
                }
            ],
            spice: 1,
            halal: false,
            kosher: false,
            glutenFree: false,
            vegan: false,
            vegetarian: false
        },
        {
            title: "Falafel Wrap",
            description: "A Middle Eastern dish made from ground chickpeas, served in a wrap.",
            image: "https://example.com/falafel-wrap.jpg",
            capacityLevel: "2/4 - It's either this, or I DoorDash Taco Bell.",
            servingSize: 2,
            ingredients: "1 cup chickpeas, 2 cloves garlic, 1 tsp cumin, 1/2 tsp coriander, 4 pita breads, 1/4 cup hummus, lettuce",
            directions: [
                {
                    necessaryEquipment: ["Food processor", "Frying pan"],
                    steps: "In a food processor, blend the chickpeas, garlic, cumin, coriander, and a pinch of salt until the mixture comes together. Form the mixture into small patties. Heat oil in a frying pan and cook the falafel until golden and crispy on both sides. Serve the falafel in warm pita bread with hummus, lettuce, and your favorite toppings."
                }
            ],
            spice: 2,
            halal: true,
            kosher: true,
            glutenFree: false,
            vegan: true,
            vegetarian: true
        },
        {
            title: "Eggplant Parmesan",
            description: "A hearty vegetarian dish of breaded and baked eggplant slices layered with marinara sauce and cheese.",
            image: "https://example.com/eggplant-parmesan.jpg",
            capacityLevel: "3/4 - I can handle a little chopping.",
            servingSize: 4,
            ingredients: "2 medium eggplants, 2 cups marinara sauce, 1 1/2 cups mozzarella cheese, 1/2 cup Parmesan cheese, 1 cup breadcrumbs, 1 egg",
            directions: [
                {
                    necessaryEquipment: ["Oven", "9x13 baking dish"],
                    steps: "Preheat your oven to 375°F. Slice the eggplants and dredge them in egg and breadcrumbs. Lay them on a baking sheet and bake for 25 minutes until golden. In a baking dish, layer marinara sauce, baked eggplant slices, mozzarella, and Parmesan. Bake for another 20-25 minutes until bubbly and the cheese is melted."
                }
            ],
            spice: 1,
            halal: true,
            kosher: true,
            glutenFree: false,
            vegan: false,
            vegetarian: true
        },
        {
            title: "Shrimp Tacos",
            description: "Zesty shrimp tacos with avocado and a squeeze of lime, served on soft corn tortillas.",
            image: "https://example.com/shrimp-tacos.jpg",
            capacityLevel: "3/4 - I can handle a little chopping.",
            servingSize: 4,
            ingredients: "1 lb shrimp, 8 corn tortillas, 1 avocado, 1/4 cup cilantro, 1 tbsp olive oil, 1 tsp chili powder, 1 lime",
            directions: [
                {
                    necessaryEquipment: ["Skillet"],
                    steps: "In a bowl, toss the shrimp with chili powder, salt, and olive oil. Heat a skillet over medium-high heat and cook the shrimp for about 2-3 minutes per side until pink and cooked through. Warm the tortillas, then assemble the tacos with shrimp, avocado slices, fresh cilantro, and a squeeze of lime."
                }
            ],
            spice: 2,
            halal: false,
            kosher: false,
            glutenFree: true,
            vegan: false,
            vegetarian: false
        },
        {
            title: "Miso Soup",
            description: "A simple, warming bowl of miso soup with tofu and seaweed.",
            image: "https://example.com/miso-soup.jpg",
            capacityLevel: "1/4 - Can't I have sleep for dinner?",
            servingSize: 2,
            ingredients: "3 cups water, 2 tbsp miso paste, 1/2 block tofu (7 oz), 1/4 cup seaweed, 1 green onion, 1 tsp soy sauce",
            directions: [
                {
                    necessaryEquipment: ["Small saucepan"],
                    steps: "Bring water to a simmer in a small saucepan. Stir in the miso paste and soy sauce until dissolved. Add the tofu and seaweed, and cook for a few more minutes until heated through. Garnish with sliced green onions and serve warm."
                }
            ],
            spice: 0,
            halal: true,
            kosher: true,
            glutenFree: true,
            vegan: true,
            vegetarian: true
        },
        {
            title: "Vegan Mac and Cheese",
            description: "A creamy, dairy-free version of mac and cheese made with a cashew-based sauce.",
            image: "https://example.com/vegan-mac-and-cheese.jpg",
            capacityLevel: "2/4 - It's either this, or I DoorDash Taco Bell.",
            servingSize: 4,
            ingredients: "8 oz gluten-free macaroni, 1 cup raw cashews, 2 tbsp nutritional yeast, 1 tsp garlic powder, 1/4 cup almond milk, 1 tbsp lemon juice",
            directions: [
                {
                    necessaryEquipment: ["Blender", "Large pot"],
                    steps: "Soak the cashews in hot water for 10 minutes. Drain and blend them with nutritional yeast, garlic powder, almond milk, and lemon juice until smooth. Cook the gluten-free macaroni according to package instructions, then toss the pasta with the cashew cheese sauce. Serve warm."
                }
            ],
            spice: 0,
            halal: true,
            kosher: true,
            glutenFree: true,
            vegan: true,
            vegetarian: true
        } 
    ]
    await Recipe.insertMany(recipes)
    console.log("Created recipes with directions!")

 //Capacities model
const recipesCL0 = (await Recipe.find({ capacityLevel: "1/4 - Can't I have sleep for dinner?" })).map(recipe => recipe._id)
const recipesCL1 = (await Recipe.find({ capacityLevel: "2/4 - It's either this, or I DoorDash Taco Bell."})).map(recipe => recipe._id)
const recipesCL2 = (await Recipe.find({ capacityLevel: "3/4 - I can handle a little chopping." })).map(recipe => recipe._id)
const recipesCL3 = (await Recipe.find({ capacityLevel: "4/4 - I am chef." })).map(recipe => recipe._id)

    const capacities = [
        {
            rank: 1,
            level: "Can't I have sleep for dinner?",
            description: "The absolute bare minimum energy. This is for when cooking feels like an impossible task, and you'd rather be in bed.",
            icon: "",
            recipes: recipesCL0,
            timeRangeMins: "5-15 minutes",
            costRangeUSD: "$5-10",
            difficultyRange: "Super easy, minimal effort"
        },
        {
            rank: 2,
            level: "It's either this, or I DoorDash Taco Bell.",
            description: "Low energy, but you're determined to avoid ordering takeout. You need something quick, easy, and satisfying.",
            icon: "", 
            recipes: recipesCL1,
            timeRangeMins: "10-20 minutes",
            costRangeUSD: "$8-15",
            difficultyRange: "Easy, minimal ingredients"
        },
        {
            rank: 3,
            level: "I can handle a little chopping.",
            description: "You have a moderate amount of energy and don't mind spending a bit of time in the kitchen. Ready to put in some effort, but nothing too fancy and unwilling to deal with a grease fire.",
            icon: "", 
            recipes: recipesCL2,
            timeRangeMins: "20-40 minutes",
            costRangeUSD: "$12-25",
            difficultyRange: "Moderate, some prep work"
        },
        {
            rank: 4,
            level: "I am chef.",
            description: "Feeling inspired and ready to dive into a full-on cooking experience. You've got the time, energy, and patience for something more involved.",
            icon: "", 
            recipes: recipesCL3,
            timeRangeMins: "45-90 minutes",
            costRangeUSD: "$20-50",
            difficultyRange: "Challenging, multi-step recipes"
        }
    ]

    await Capacity.insertMany(capacities)
    console.log("Created capacities!")
    console.log(capacities)
}

const run = async () => {
    await main()
    db.close()
}

run()