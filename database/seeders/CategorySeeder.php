<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        $categories = [
            [
                'name' => 'Income',
                'type' => 'income',
                'description' => 'Regular income sources like salary, freelance, etc.',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Salary',
                'type' => 'income',
                'description' => 'Monthly salary from employment',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Groceries',
                'type' => 'expense',
                'description' => 'Food and household supplies',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Transportation',
                'type' => 'expense',
                'description' => 'Public transport, fuel, vehicle maintenance',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Utilities',
                'type' => 'expense',
                'description' => 'Electricity, water, internet bills',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Entertainment',
                'type' => 'expense',
                'description' => 'Movies, dining out, hobbies',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Savings',
                'type' => 'expense',
                'description' => 'Emergency fund and general savings',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Investment',
                'type' => 'expense',
                'description' => 'Stocks, mutual funds, property',
                'user_id' => $user->id,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}