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
                'icon' => '💰',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Salary',
                'type' => 'income',
                'icon' => '💼',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Groceries',
                'type' => 'expense',
                'icon' => '🛒',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Transportation',
                'type' => 'expense',
                'icon' => '🚗',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Utilities',
                'type' => 'expense',
                'icon' => '⚡',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Entertainment',
                'type' => 'expense',
                'icon' => '🎮',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Savings',
                'type' => 'expense',
                'icon' => '💵',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Investment',
                'type' => 'expense',
                'icon' => '📈',
                'user_id' => $user->id,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}