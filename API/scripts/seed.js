
require('dotenv').config({path: './.env'});

const db = require('../db'); // db conection
const {faker} = require('@faker-js/faker');

async function generateRecipes(count = 50) {
    try {
        console.log(`Seeding database with ${count} recipes...`);
        const recipesCollection = db.collection('recipes');

        for (let i = 0; i < count; i++) {
            const recipe = {
                title: faker.food.dish(),
                description: faker.food.description(),
                cookingTime: faker.number.int({ min: 10, max: 180 }), //min
                difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
                //obiecte imbricate
                category: {
                    id: faker.string.uuid(),
                    name: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'Dessert']),
                    tags: Array(3).fill().map(() => faker.food.ingredient())
                },
                ingredients: Array(5).fill().map(() => ({
                    name: faker.food.ingredient(),
                    amount: faker.number.int({ min: 1, max: 500 }),
                    unit: faker.helpers.arrayElement(['g', 'ml', 'pcs', 'tablespoons', 'packets'])
                })),
                author: {
                    id: faker.string.uuid(),
                    name: faker.person.fullName(),
                },
                createdAt: faker.date.past().toISOString()
            };

            await recipesCollection.add(recipe);

            if ((i + 1) % 10 === 0) {
                console.log(`${i + 1} recipes added...`);
            }
        }

        console.log('Database seeding completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
generateRecipes();