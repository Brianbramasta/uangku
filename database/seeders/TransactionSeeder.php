<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $categories = Category::all();

        foreach ($users as $user) {
            // Create income transactions
            $incomeCategories = $categories->where('type', 'income');
            foreach ($incomeCategories as $category) {
                Transaction::create([
                    'user_id' => $user->id,
                    'category_id' => $category->id,
                    'amount' => fake()->numberBetween(1000000, 10000000),
                    'description' => fake()->sentence(),
                    'date' => fake()->dateTimeBetween('-1 month', 'now'),
                    'type' => 'income'
                ]);
            }

            // Create expense transactions
            $expenseCategories = $categories->where('type', 'expense');
            foreach ($expenseCategories as $category) {
                // Create multiple expenses per category
                for ($i = 0; $i < fake()->numberBetween(2, 5); $i++) {
                    Transaction::create([
                        'user_id' => $user->id,
                        'category_id' => $category->id,
                        'amount' => fake()->numberBetween(50000, 1000000),
                        'description' => fake()->sentence(),
                        'date' => fake()->dateTimeBetween('-1 month', 'now'),
                        'type' => 'expense'
                    ]);
                }
            }
        }
    }
}