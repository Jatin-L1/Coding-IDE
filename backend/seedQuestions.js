const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config(); // Add this line to load .env variables

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const questions = [
      {
        title: "Reverse a Linked List",
        description: "Write a function to reverse a singly linked list.",
        inputFormat: "List of integers separated by space.",
        outputFormat: "List of integers in reverse order.",
        testCases: [
          { input: "1 2 3 4", output: "4 3 2 1" },
          { input: "5 10 15", output: "15 10 5" },
        ],
        topic: "linked-list",
      },
      {
        title: "Sum of Two Numbers",
        description: "Write a program that takes two integers and outputs their sum.",
        inputFormat: "Two integers separated by space.",
        outputFormat: "Single integer representing the sum.",
        testCases: [
          { input: "3\n5", output: "8" },
          { input: "10\n20", output: "30" },
        ],
        topic: "math",
      },
      {
        title: "Two Sum",
        description:
          "Given an array of integers and a target value, return the indices of the two numbers that add up to the target.",
        inputFormat: "Array of integers separated by space followed by target value.",
        outputFormat: "Indices of the two numbers separated by space.",
        testCases: [
          { input: "2 7 11 15 9", output:"0 1"
          },
          { input: "3 2 4 6", output: "1 2" },
        ],
        topic: "arrays",
      },
        
    ];

    await Question.insertMany(questions);
    console.log("Questions seeded successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding questions:", error.message);
  }
};

seedQuestions();
