<?php

namespace Database\Seeders;

use App\Models\Budget;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BudgetSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $expenseCategories = Category::where('type', 'expense')->get();

        foreach ($users as $user) {
            foreach ($expenseCategories as $category) {
                Budget::create([
                    'user_id' => $user->id,
                    'category_id' => $category->id,
                    'amount_limit' => fake()->numberBetween(1000000, 5000000),
                    'start_date' => now()->startOfMonth(),
                    'end_date' => now()->endOfMonth(),
                    'description' => 'Monthly budget for ' . $category->name
                ]);
            }
        }
    }
}
